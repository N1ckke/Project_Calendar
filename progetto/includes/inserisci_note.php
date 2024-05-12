<?php

    include "connect.php";
    session_start();

    if(!empty($_POST["titolo"]) && !empty($_POST["data"]) && !empty($_POST["ora"]) && isset($_SESSION["email"])){
        $titolo = $_POST['titolo'];
        $data = $_POST['data'];
        $ora = $_POST['ora'];
        $email = $_SESSION['email'];

        $sql="INSERT INTO note(titolo,data,ora) 
            VALUES ('$titolo','$data','$ora')";
            if($conn->query($sql)===TRUE){
                $sql="INSERT INTO utenti_note(ID_nota, ID_utente) 
                    Values ((SELECT ID FROM UTENTE WHERE email = '$email'),
                    (SELECT ID FROM note WHERE data = '$data')";
                if($conn->query($sql)===TRUE){
                    header("Location: ../pages/home.html");
                }else{
                    echo "<script>";
                    echo "var message = 'ops... qualcosa è andato storto';";
                    echo "alert(message);";
                    echo "window.location.href = '../pages/inserisci_nota.html';";
                    echo "</script>";
                }
            }else{
                echo "siamo spiacenti, qualcosa è andato storto";
            }
    }