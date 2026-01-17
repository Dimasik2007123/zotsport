<?php

header('Content-Type: application/json; charset=utf-8');

if (isset($_POST['category'])) {$category = $_POST['category'];}
if (isset($_POST['name'])) {$name = $_POST['name'];}

$db = new PDO('sqlite:/var/www/html/db/catalog.db');

$stmt = $db->prepare("DELETE FROM catalog WHERE name = :name");
$stmt->execute([':name' => $name]);
$deletedCount = $stmt->rowCount();
$source = '/var/www/html/db/catalog.db';
$destination = '/var/www/html/db_copy/catalog.db';

copy($source, $destination);

if ($deletedCount > 0){
   echo json_encode(['success' => true, 'message' => 'Товар удален']);
}
else {
  echo json_encode(['success' => false, 'message' => 'Ошибка при удалении товара']);
}

exit;
?>