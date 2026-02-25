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

$email_sendgrid = new Mail();
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
?>
 