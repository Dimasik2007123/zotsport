<?php
require '/var/www/html/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

use SendGrid\Mail\Mail;

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
$selec = $_POST['connect'];
$spis = $_POST['product_list'];
$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis"; //Текст сообщения


$email = new Mail();
$email->setFrom("zdima4444@yandex.ru", "ЗотСпорт");
$email->setSubject("Заказ ЗотСпорт");
$email->addTo("zdima4444@gmail.com", "Дмитрий");
$email->addContent("text/plain", $mes);

// Инициализируем SendGrid с API-ключом
$sendgrid = new \SendGrid('YKL8ZYSB5QGKQ9NPK9HWASZK');

$sendgrid->send($email);
 
echo json_encode((['success' => true, 'message' => 'Заказ успешно отправлен']), JSON_UNESCAPED_UNICODE);
?>