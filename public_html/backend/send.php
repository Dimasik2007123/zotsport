<?php
require '/var/www/html/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

use SendGrid\Mail\Mail;

if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['surname'])) {$surname = $_POST['surname'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['city'])) {$city = $_POST['city'];}
$selec = $_POST['connect'] ?? '';
$spis = $_POST['product_list'] ?? '';

$mes = "Тема: Заказ ЗотСпорт\nИмя: $name\nФамилия: $surname\nТелефон: $phone\nПочта: $email\nАдрес: $city\nСпособ связи: $selec\nСписок товаров: $spis";

// Логирование для отладки
$log_file = '/tmp/sendgrid_debug.log';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Начало отправки\n", FILE_APPEND);

$email = new Mail();
$email->setFrom("zdima4444@yandex.ru", "ЗотСпорт");
$email->setSubject("Заказ ЗотСпорт");
$email->addTo("zdima4444@gmail.com", "Дмитрий");
$email->addContent("text/plain", $mes);

$sendgrid = new \SendGrid('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');

try {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Отправка запроса...\n", FILE_APPEND);
    
    $response = $sendgrid->send($email);
    
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Статус: " . $response->statusCode() . "\n", FILE_APPEND);
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Тело ответа: " . $response->body() . "\n", FILE_APPEND);
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Заголовки: " . print_r($response->headers(), true) . "\n", FILE_APPEND);
    
    if ($response->statusCode() >= 200 && $response->statusCode() < 300) {
        echo json_encode(['success' => true, 'message' => 'Заказ успешно отправлен'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Ошибка SendGrid: ' . $response->body()
        ], JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Исключение: " . $e->getMessage() . "\n", FILE_APPEND);
    
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>