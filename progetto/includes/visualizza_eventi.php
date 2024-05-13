<?php
include "connect.php";
session_start();

if (!empty($_POST["data"]) && isset($_SESSION["email"])) {
    $data = $_POST['data'];
    $email = $_SESSION['email'];
    
    $sql = "SELECT note.titolo, note.ora_evento 
            FROM utenti_note 
            INNER JOIN note ON utenti_note.ID_nota = note.ID 
            INNER JOIN utenti ON utenti_note.ID_utente = utenti.ID 
            WHERE utenti.email = '$email' AND note.data_evento = '$data'";

    $res = $conn->query($sql);

    if ($res && $res->num_rows > 0) {
        $eventi = array();
        while ($row = $res->fetch_assoc()) {
            $eventi[] = array(
                'titolo' => $row['titolo'],
                'ora' => $row['ora_evento']
            );
        }
        echo json_encode($eventi);
    } else {
        echo "false";
    }
}
?>
