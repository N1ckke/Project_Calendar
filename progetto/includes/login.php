<?php
include "connect.php";
session_start();

if(isset($_POST['email']) && isset($_POST['password'])){
    $email = $_POST['email'];
    $password = md5($_POST['password']);
	$sql = "SELECT * FROM utenti WHERE email = '$email' 
			AND password = '$password'";
	$res = $conn -> query($sql);
	if($res -> num_rows > 0){
		$_SESSION["email"] = $email;
		$sql = "SELECT nome_utente FROM utenti WHERE email = '$email'";
		$row = $res->fetch_assoc();
        $nome_utente = $row['nome_utente']; 
        $_SESSION["nome_utente"] = $nome_utente; 
		
		header("Location: ../pages/home.php");
	}else{
		echo "Utente non trovato";
	}
}else{
	echo "<script>";
    echo "var message = 'Un campo non è stato compilato';";
    echo "alert(message);";
    echo "window.location.href = '../pages/login.html';";
    echo "</script>";
}
?>