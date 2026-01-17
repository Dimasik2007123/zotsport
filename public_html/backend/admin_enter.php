<?php

header('Content-Type: application/json; charset=utf-8');

if (isset($_POST['login'])) {$login = $_POST['login'];}
if (isset($_POST['password'])) {$password = $_POST['password'];}

$db = new PDO('sqlite:/var/www/html/db/admins.db');

$stmt = $db->prepare("SELECT password FROM users WHERE login = :login");
$stmt->execute([':login' => $login]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && ($password == $user['password'])){
    echo json_encode(['success' => true, 'message' => 'Успешный вход']);
} 
else {
    echo json_encode(['success' => false, 'message' => 'Неверный логин или пароль']);
}

exit;
?>
