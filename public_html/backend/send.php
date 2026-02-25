<?php
require '/var/www/html/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

/*use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;*/
use SendGrid\Mail\Mail;

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
$selec = $_POST['connect'];
$spis = $_POST['product_list'];
$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis"; //Текст сообщения

/*$mail = new PHPMailer(True);
$mail->isSMTP();
$mail->Host = 'smtp.yandex.ru'; 
$mail->SMTPAuth = true;
$mail->Username = 'zdima4444@yandex.ru';
$mail->Password = 'nvsqckowhsfxikqw';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port = 465;

$mail->setFrom('zdima4444@yandex.ru', 'ЗотСпорт');
$mail->addAddress('zdima4444@gmail.com');

$mail->CharSet = 'UTF-8';
$mail->Subject = 'Заказ ЗотСпорт';
$mail->Body = $mes;

$mail->send();*/

/*$email_sendgrid = new Mail();
$email_sendgrid->setFrom("zdima4444@yandex.ru", "ЗотСпорт");
$email_sendgrid->setSubject("Заказ ЗотСпорт");
$email_sendgrid->addTo("zdima4444@gmail.com");
$email_sendgrid->addContent("text/plain", $mes);

$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));

try {
    $response = $sendgrid->send($email_sendgrid);
    echo json_encode(['success' => true, 'message' => 'Заказ успешно отправлен'], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

exit;
?>*/

$log_file = '/tmp/sendgrid_debug.log';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - НАЧАЛО\n", FILE_APPEND);
file_put_contents($log_file, date('Y-m-d H:i:s') . " - POST: " . print_r($_POST, true) . "\n", FILE_APPEND);

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
$selec = $_POST['connect'] ?? '';
$spis = $_POST['product_list'] ?? '';

$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis";

file_put_contents($log_file, date('Y-m-d H:i:s') . " - Сообщение: $mes\n", FILE_APPEND);

$email_sendgrid = new Mail();
$email_sendgrid->setFrom("zdima4444@yandex.ru", "ЗотСпорт");
$email_sendgrid->setSubject("Заказ ЗотСпорт");
$email_sendgrid->addTo("zdima4444@gmail.com");
$email_sendgrid->addContent("text/plain", $mes);

$api_key = getenv('SENDGRID_API_KEY');
file_put_contents($log_file, date('Y-m-d H:i:s') . " - API Key (первые 10): " . substr($api_key, 0, 10) . "...\n", FILE_APPEND);

$sendgrid = new \SendGrid($api_key);

try {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Отправка...\n", FILE_APPEND);
    $response = $sendgrid->send($email_sendgrid);
    
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Статус: " . $response->statusCode() . "\n", FILE_APPEND);
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Тело: " . $response->body() . "\n", FILE_APPEND);
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Заголовки: " . print_r($response->headers(), true) . "\n", FILE_APPEND);
    
    if ($response->statusCode() >= 200 && $response->statusCode() < 300) {
        echo json_encode(['success' => true, 'message' => 'Заказ успешно отправлен'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка SendGrid: ' . $response->body()], JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Исключение: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

file_put_contents($log_file, date('Y-m-d H:i:s') . " - КОНЕЦ\n\n", FILE_APPEND);
exit;
?>
 