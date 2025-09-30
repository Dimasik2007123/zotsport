<?php
if (isset($_POST['category'])) {$category = $_POST['category'];}
if (isset($_POST['name'])) {$name = $_POST['name'];}
header('Refresh: 1; URL=../admin_choice.html'); 

$db = new PDO('sqlite:/var/www/html/db/catalog.db');
$stmt = $db->prepare("DELETE FROM catalog WHERE name = :name");
$stmt->execute([':name' => $name]);
$deletedCount = $stmt->rowCount();
$source = '/var/www/html/db/catalog.db';
$destination = '/var/www/html/db_copy/catalog.db';
copy($source, $destination);
if ($deletedCount > 0){
?>
<script type="text/javascript">
 alert("Товар удален");
</script>
<?php
}
else{
?>
<script type="text/javascript">
 alert("Товар не удален");
</script>
<?php
}    

?>