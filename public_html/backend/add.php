<?php
// Здесь проверяется существование переменных
if (isset($_POST['category'])) {$category = $_POST['category'];}
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['old_price'])) {$old_price = $_POST['old_price'];}
if (isset($_POST['sale'])) {$sale = $_POST['sale'];}
else {$sale = 0;}
if (isset($_FILES['image'])) {$image = $_FILES['image'];}
if (isset($_POST['brand'])) {$brand = $_POST['brand'];}
else {$brand = "None";}
if (isset($_POST['av'])) {$selec = 1;}
else {$selec = 0;}
$price = $old_price - $sale*$old_price/100;
$imageData = file_get_contents($image['tmp_name']);
$imageBase64 = 'data:' . $image['type'] . ';base64,' . base64_encode($imageData);

header('Refresh: 1; URL=../admin_choice.html'); 
$db = new PDO('sqlite:/var/www/html/db/catalog.db');
$stmt = $db->prepare("INSERT INTO catalog (name, category, old_price, price, sale, brand, image, avalible) VALUES (:name, :category, :old_price, :price, :sale, :brand, :image, :avalible)");
$stmt->execute([
    ':name' => $name,
    ':category' => $category,
    ':old_price' => $old_price,
    ':price' => $price,
    ':sale' => $sale,
    ':brand' => $brand,
    ':image' => $imageBase64,
    ':avalible' => $selec
]);
$source = '/var/www/html/db/catalog.db';
$destination = '/var/www/html/db_copy/catalog.db';
copy($source, $destination);
?>
<script type="text/javascript">
 alert("Товар добавлен");
</script>
