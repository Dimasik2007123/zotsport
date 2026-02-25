<?php
require '/var/www/html/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

$log_file = __DIR__ . '/send_debug.log';

// Функция для записи в лог
function writeLog($message) {
    global $log_file;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message\n", FILE_APPEND);
}

// Начинаем логирование
writeLog("=== НАЧАЛО ===");
writeLog("POST: " . print_r($_POST, true));

/*use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use SendGrid\Mail\Mail;*/

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
$email_sendgrid->addTo("zdima4444@yandex.ru");
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

writeLog("Сообщение: $mes");



use Mailtrap\Helper\ResponseHelper;
use Mailtrap\MailtrapClient;
use Mailtrap\Mime\MailtrapEmail;
use Symfony\Component\Mime\Address;

writeLog("ШАГ 2: После use");

require __DIR__ . '/vendor/autoload.php';

writeLog("ШАГ 2: После autoload");

$apiKey = getenv('MAILTRAP_API_KEY');
writeLog("ШАГ 2: После key");
// Формируем данные для отправки
$postData = [
    'from' => [
        'email' => 'hello@demomailtrap.co',
        'name' => 'ЗотСпорт'
    ],
    'to' => [
        [
            'email' => 'zdima4444@gmail.com'
        ]
    ],
    'subject' => 'Заказ от ' . $name . ' ' . $surname,
    'text' => $mes
];

writeLog("POST Data: " . json_encode($postData, JSON_UNESCAPED_UNICODE));

// Инициализируем cURL
$ch = curl_init('https://send.api.mailtrap.io/api/send');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_VERBOSE, true); // Добавляем подробный вывод

$verbose = fopen('php://temp', 'w+');
curl_setopt($ch, CURLOPT_STDERR, $verbose);

// Выполняем запрос
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

rewind($verbose);
$verboseLog = stream_get_contents($verbose);
writeLog("CURL Verbose: " . $verboseLog);

curl_close($ch);

writeLog("HTTP Code: " . $httpCode);
writeLog("Response: " . $response);
if ($curlError) writeLog("CURL Error: " . $curlError);

// Проверяем результат
if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'Заказ успешно отправлен'], JSON_UNESCAPED_UNICODE);
} else {
    $errorMsg = $curlError ?: $response;
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки: ' . $errorMsg], JSON_UNESCAPED_UNICODE);
}

writeLog("=== КОНЕЦ ===\n");
?>
 