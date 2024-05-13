<?php
    include "../includes/connect.php";
    session_start();

    if(!isset($_SESSION['email']) || !isset($_SESSION['nome_utente'])){
        header("Location: index.html");
        exit;
    }
?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>New Note Moduel</title>
</head>
<body>
    <div class="container-fluid pt-md-3 pb-md-3 mt-3">
        <div class="border border-secondary rounded rounded-4 border-4 ms-6 me-6">
        <div class="container text-center pt-3 pb-3">

            <h1>Nuova nota</h1>
        </div>
        <form action="../includes/inserisci_note.php" method="post">
        <div class="pt-3 pb-3 ms-5 me-5">

            <div class="mt-3 mb-3">

            
            <label  class="form-label">Titolo</label>
            <input type="text" class="form-control" name="titolo" aria-describedby="titleHelp">
        </div>

            <div class="mt-3 mb-3">

            <label class="form-label">Data evento</label>
            <input type="date" name="data" class="form-control">

        </div> 

        <div class="mt-3 mb-3">

            <label class="form-label">Ora</label>
            <input type="time" name="ora" class="form-control">

        </div> 

            <div class="mt-3 mb-3">
            <input type="submit" class="btn btn-outline-secondary mb-3" value="Salva Evento">
            </div>
        </div>
        </div>
        </form>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>