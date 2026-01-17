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
{$selec = $_POST['connect'];}
{$spis = $_POST['product-list'];}
$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis"; //Текст сообщения

$mail = new PHPMailer(True);
$mail->isSMTP();
$mail->Host = 'smtp.mail.ru'; 
$mail->SMTPAuth = true;
$mail->Username = 'vanya.sergeev.8787@mail.ru';
$mail->Password = getenv('SMTP_PASSWORD');
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('vanya.sergeev.8787@mail.ru', 'ЗотСпорт');
$mail->addAddress('zdima4444@gmail.com');

$mail->CharSet = 'UTF-8';
$mail->Subject = 'Заказ ЗотСпорт';
$mail->Body = $mes;

$mail->send();
 
echo json_encode((['success' => true, 'message' => 'Заказ успешно отправлен']), JSON_UNESCAPED_UNICODE);
?>
