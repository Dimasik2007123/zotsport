<?php
// Здесь проверяется существование переменных
if (isset($_POST['login'])) {$login = $_POST['login'];}
if (isset($_POST['password'])) {$password = $_POST['password'];}

$db = new PDO('sqlite:/var/www/html/db/admins.db');

$stmt = $db->prepare("SELECT password FROM users WHERE login = :login");
$stmt->execute([':login' => $login]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

ini_set('short_open_tag', 'On');
header('Refresh: 4; URL=../index.html'); 
if ($user && ($password == $user['password'])){
?>
<script type="text/javascript">
    var adm = 1;
    localStorage.setItem('adm', adm);
	location.replace("../admin_choice.html");
</script>
<?php
}
else{
?>
<script type="text/javascript">
    location.replace("../admin_enter.html");
	alert("Неверный логин или пароль");
</script>"
<?php
}
?>