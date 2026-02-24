<?php
$to = "zdima4444@gmail.com";
$subject = "Тест почты с Timeweb";
$message = "Это тестовое письмо с сервера Timeweb\nВремя: " . date('Y-m-d H:i:s');
$headers = "From: zdima4444@yandex.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Письмо отправлено через mail()";
} else {
    echo "❌ Ошибка отправки через mail()";
}
?>
