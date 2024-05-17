<?php

    include "connect.php";
    session_start();

    if(!empty($_POST["titolo"]) && !empty($_POST["data"]) && !empty($_POST["ora"]) && isset($_SESSION["email"])){
        $titolo = $_POST['titolo'];
        $data = $_POST['data'];
        $ora = $_POST['ora'];
        $email = $_SESSION['email'];
        $nome_utente = $_SESSION['nome_utente'];

        $sql="DELETE FROM utenti_note
            WHERE (SELECT ID FROM note WHERE '$titolo' = titolo 
            AND '$data' = data_evento AND '$ora' = ora_evento) = ID_nota 
            AND (SELECT ID FROM utenti WHERE '$email' = email 
            AND '$nome_utente' = nome_utente) = ID_utente;";
            if($conn->query($sql)===TRUE){
                header("Location: ../pages/home.html");
            }else{
                echo "siamo spiacenti, qualcosa è andato storto";
            }
    }