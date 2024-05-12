<?php
    session_start();

    $_SESSION['nome_utente'] = null;
    $_SESSION['email'] = null;

    session_destroy();

    header("Location: ../pages/index.html");
    exit();
?>
