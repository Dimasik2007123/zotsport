<?php
$to = "vanya.sergeev.8787@mail.ru";
$subject = "Тест почты с Timeweb";
$message = "Это тестовое письмо с сервера Timeweb\nВремя: " . date('Y-m-d H:i:s');

// Исправляем заголовки
$headers = "From: vanya.sergeev.8787@mail.ru\r\n";  // Добавили From
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Письмо отправлено через mail()";
} else {
    echo "❌ Ошибка отправки через mail()";
}
?>