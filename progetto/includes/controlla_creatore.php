<?php

    include "connect.php";
    session_start();

    if(!empty($_POST["titolo"]) && !empty($_POST["data"]) && !empty($_POST["ora"]) && isset($_SESSION["email"])){
        $data = date("Y-m-d", strtotime($_POST['data']));

        $titolo = $_POST['titolo'];
        $data = $_POST['data'];
        $ora = $_POST['ora'];
        $email = $_SESSION['email'];


        $sql = "SELECT utenti.nome_utente FROM utenti
                INNER JOIN utenti_note ON utenti_note.ID_utente = utenti.ID
                WHERE (SELECT ID FROM note WHERE '$titolo' = titolo AND '$data' = data_evento AND '$ora' = ora_evento) = utenti_note.ID_nota AND utenti_note.ruolo = 'creatore'
                LIMIT 1;";

        $res = $conn->query($sql);

        if ($res && $res->num_rows > 0) {
            echo = $res->fetch_assoc();
            
        } else {
            echo "<script>";
            echo "console.log('Errore in controlla_creatore.php')";
            echo "</script>"; 
            
        }

    }
 