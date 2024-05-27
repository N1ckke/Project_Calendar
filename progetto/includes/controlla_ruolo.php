<?php

    include "connect.php";
    session_start();

    if(!empty($_POST["titolo"]) && !empty($_POST["data"]) && !empty($_POST["ora"]) && isset($_SESSION["email"])){
        $data = date("Y-m-d", strtotime($_POST['data']));

        $titolo = $_POST['titolo'];
        $data = $_POST['data'];
        $ora = $_POST['ora'];
        $email = $_SESSION['email'];


        $sql = "SELECT ruolo FROM utenti_note 
                INNER JOIN note ON utenti_note.ID_nota = note.ID 
                INNER JOIN utenti ON utenti_note.ID_utente = utenti.ID 
                WHERE utenti.email = '$email' AND note.titolo = '$titolo'
                AND note.data_evento = '$data' AND note.ora_evento = '$ora'";

        $res = $conn->query($sql);

        if ($res && $res->num_rows > 0) {
            $value = $res->fetch_assoc();
            if(value == 'collaboratore'){
                echo "true";
            }else{
                echo "flaso";
            }
        } else {
            echo "<script>";
            echo "console.log('Errore in controllo_ruolo.php')";
            echo "</script>"; 
            
        }

    }
 