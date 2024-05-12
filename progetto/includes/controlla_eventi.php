<?php

    include "connect.php";
    session_start();

    if(!empty($_POST["titolo"]) && !empty($_POST["data"]) && !empty($_POST["ora"]) && isset($_SESSION["email"])){

        $data = $_POST['data'];
        $mail = $_SESSION['mail'];


        $sql = "SELECT note.data, utenti.email FROM utenti_note INNER JOIN note ON utenti_note.ID_nota = note.ID INNER JOIN utenti ON utenti_note.ID_utente = utenti.ID WHERE utenti.email = '$mail' AND note.data = '$data'";
        if($res -> num_rows > 0){
            return true;
        }else{
            return false;
        }

    }