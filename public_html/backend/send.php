<?php
require '/var/www/html/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
$selec = $_POST['connect'];
$spis = $_POST['product_list'];
$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis";


/*$apiKey = getenv('MAILTRAP_API_KEY');
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

$ch = curl_init('https://send.api.mailtrap.io/api/send');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'Заказ успешно отправлен'], JSON_UNESCAPED_UNICODE);
} else {
    $errorMsg = $curlError ?: $response;
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки: ' . $errorMsg], JSON_UNESCAPED_UNICODE);
}

?>*/

$mail = new PHPMailer(True);
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

$mail->send();
 
echo json_encode((['success' => true, 'message' => 'Заказ успешно отправлен']), JSON_UNESCAPED_UNICODE);
?>
 