<?php
require '/var/www/html/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Логирование
$log_file = '/tmp/phpmailer_debug.log';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - НАЧАЛО\n", FILE_APPEND);

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
$selec = $_POST['connect'];
$spis = $_POST['product_list'];
$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis";

$mail = new PHPMailer(true);

try {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Настройка SMTP\n", FILE_APPEND);
    
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru'; 
    $mail->SMTPAuth = true;
    $mail->Username = 'zdima4444@yandex.ru';
    $mail->Password = 'nvsqckowhsfxikqw';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    
    // ВАЖНО: добавляем таймаут!
    $mail->Timeout = 10; // 10 секунд на каждую операцию
    $mail->SMTPKeepAlive = false;
    
    // Включаем отладку
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Debugoutput = function($str, $level) use ($log_file) {
        file_put_contents($log_file, date('Y-m-d H:i:s') . " - $str", FILE_APPEND);
    };
    
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Установка отправителя\n", FILE_APPEND);
    $mail->setFrom('zdima4444@yandex.ru', 'ЗотСпорт');
    $mail->addAddress('zdima4444@gmail.com');
    
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Заказ ЗотСпорт';
    $mail->Body = $mes;
    
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Попытка отправки...\n", FILE_APPEND);
    $mail->send();
    
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - УСПЕХ\n", FILE_APPEND);
    
    echo json_encode(['success' => true, 'message' => 'Заказ успешно отправлен'], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - ОШИБКА: " . $mail->ErrorInfo . "\n", FILE_APPEND);
    
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка: ' . $mail->ErrorInfo
    ], JSON_UNESCAPED_UNICODE);
}
?>