<?php
include "connect.php";
if(!empty($_POST["nome"]) && !empty($_POST["cognome"]) && !empty($_POST["nome_utente"]) && !empty($_POST["email"]) && !empty($_POST["password"])){
    $nome=strtolower($_POST["nome"]);
    $cognome=strtolower($_POST["cognome"]);
    $nome_utente=trim($_POST["nome_utente"]);
    $email=strtolower($_POST["email"]);
    $password=md5($_POST["password"]);

    $sql="SELECT * FROM utenti WHERE email ='$email'";
    $res=$conn->query($sql);
    if($res->num_rows>0){
        echo "Questa mail è già stata utilizzata per un altro utente T_T";
    }else{
        $sql="SELECT * FROM utenti WHERE nome_utente ='$nome_utente'";
        $res=$conn->query($sql);
        if($res->num_rows>0){
            echo "Questo nome utente è già stato utilizzato";
        }else{
            $sql="INSERT INTO utenti(nome, cognome, nome_utente, email, password) 
                VALUES ('$nome','$cognome','$nome_utente','$email','$password')";
            if($conn->query($sql)===TRUE){
                echo "Utente registrato";
                header("Location: ../pages/login.html");
                exit();
            }else{
                echo "Errore";
            }
        }
    }
    $conn->close();
}else{
    echo "<script>";
    echo "var message = 'Un campo non è stato compilato';";
    echo "alert(message);";
    echo "window.location.href = '../pages/index.html';";
    echo "</script>";
}



?>
