<?php
include "connect.php";
session_start();

if (!empty($_POST["titolo"]) && !empty($_POST["data"]) && !empty($_POST["ora"]) && isset($_SESSION["email"])) {
    $titolo = $_POST['titolo'];
    $data = $_POST['data'];
    $ora = $_POST['ora'];
    $email = $_SESSION['email'];

    $sql = "INSERT INTO note(titolo,data_evento,ora_evento) 
            VALUES ('$titolo','$data','$ora')";
    if ($conn->query($sql) === TRUE) {
        $sql = "INSERT INTO utenti_note(ID_utente, ID_nota) 
        Values ((SELECT ID FROM utenti WHERE email = '$email' LIMIT 1),
        (SELECT ID FROM note WHERE data_evento = '$data' AND titolo = '$titolo' AND ora_evento = '$ora' LIMIT 1))";
        if ($conn->query($sql) === TRUE) {
            header("Location: ../pages/home.php");
        } else {
            echo "<script>";
            echo "var message = 'ops... qualcosa è andato storto';";
            echo "alert(message);";
            echo "window.location.href = '../pages/nuova_nota.php';";
            echo "</script>";
        }
    } else {
        echo "siamo spiacenti, qualcosa è andato storto";
    }
}
?>
