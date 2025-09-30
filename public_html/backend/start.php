<?php
$db = new PDO('sqlite:/var/www/html/db/catalog.db');
$stmt = $db->query("SELECT * FROM catalog");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (empty($data)) {
    echo json_encode([]);
    exit;
}
echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
?>