<?php

    include "connect.php";
    session_start();

    if(!empty($_POST["data"]) && isset($_SESSION["email"])){
        $data = date("Y-m-d", strtotime($_POST['data']));

        $data = $_POST['data'];
        $email = $_SESSION['email'];


        $sql = "SELECT note.data_evento, utenti.email FROM utenti_note 
                INNER JOIN note ON utenti_note.ID_nota = note.ID 
                INNER JOIN utenti ON utenti_note.ID_utente = utenti.ID 
                WHERE utenti.email = '$email' AND note.data_evento = '$data'";

        $res = $conn->query($sql);

        if ($res && $res->num_rows > 0) {
            echo "true";
        } else {
            echo "false";
            
        }

    }
