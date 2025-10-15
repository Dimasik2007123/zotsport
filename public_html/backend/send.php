<?php
require '/var/www/html/vendor/autoload.php'; // Подключаем PHPMailer через Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Здесь проверяется существование переменных
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
{$selec = $_POST['sport'];} //Вводится переменная, содержащая информацию о выбранном способе связи
{$spis = $_POST['tovari'];} //В другой переменной содержатся сведения о товарах, добавленных в корзину
$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis"; //Текст сообщения

$mail = new PHPMailer(True);
$mail->isSMTP();
$mail->Host = 'smtp.mail.ru'; 
$mail->SMTPAuth = true;
$mail->Username = 'vanya.sergeev.8787@mail.ru';
$mail->Password = getenv('SMTP_PASSWORD');
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('vanya.sergeev.8787@mail.ru', 'ЗотСпорт'); // От кого (username)
$mail->addAddress('zdima4444@gmail.com'); // Кому (получатель)

$mail->CharSet = 'UTF-8'; // Кодировка UTF-8 для кириллицы
$mail->Subject = 'Заказ ЗотСпорт';
$mail->Body = $mes;

$mail->send();
 
?>
<!DOCTYPE HTML> <!--Новая страница, оповещающая покупателя о заказе-->
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="4; url=../index.html">
<meta name="description" content="ЗотСпорт. Спасибо за заказ!">
<title>Спасибо! Мы свяжемся с вами!</title>
<link rel="stylesheet" href="../css/style1.css">
<link rel="icon" href="../images/favicon.ico" type="image/x-icon">
<meta name="generator">
<script type="text/javascript">
localStorage.removeItem('cart');
setTimeout('location.replace("../index.html")', 4000);
//Изменить текущий адрес страницы через 4 секунды
</script> 
</head>
<body background="../images/fon_shop1.png">
<center><a href="../index.html"><img src="../images/logo.png"  height="70px" border="1px solid black"></a></center>
<div>
	<nav id="top">
	<ul>
	<li><a id="silka2" href="../food.html">Спортивное питание</a></li>
	<li><a href="../balls.html" id="silka2">Футбольные мячи</a></li>
	<li><a href="../index.html" id="silka2">Одежда и обувь</a>
		<ul class="vipad">
		<li><a href="../boots.html" id="silka2">Бутсы</a></li>
		<li><a href="../shirt.html" id="silka2">Футболки</a></li>
		<li><a href="../shorts.html" id="silka2">Шорты</a></li></ul></li>
	<li><a href="../cart.html" id="silka2">Корзина</a></li></ul>
</nav></div>
<div class="text">
<p>Спасибо за заказ! В ближайшее время с Вами свяжется менеждер для подтверждения заказа!</p>
</div>
<div class="niz">
<table width=100%><tr>
<th><a id="niz1" href="../shop_glavnoe.html">О магазине</a>&nbsp;<a id="niz1" href="../contacts.html">Контакты</a>&nbsp;<a id="niz1" href="../delivery.html">Доставка и оплата</a>
</tr>
</div>	
</body>
</html>