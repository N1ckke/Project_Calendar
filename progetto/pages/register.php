<?php
    require "connect.php";
    session_start();
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Register Module</title>
</head>
<body>
    <div class="container-fluid pt-md-3 pb-md-3 mt-3">
        <div class="border border-secondary rounded rounded-4 border-4 ms-6 me-6">
        <div class="container text-center pt-3 pb-3">

            <h1>Register</h1>
        </div>  
        <div class="pt-3 pb-3 ms-5 me-5">

            <div class="mt-3 mb-3">

                <label for="exampleInputName1" class="form-label">Nome</label>
                <input type="text" class="form-control" name="nome" aria-describedby="nameHelp">
            </div>

            <div class="mt-3 mb-3">

                <label for="exampleInputSurname1" class="form-label">Cognome</label>
                <input type="text" class="form-control" name="cognome" aria-describedby="surnamelHelp">
            </div>

            <div class="mt-3 mb-3">

                <label for="exampleInputSurname1" class="form-label">Nome utente</label>
                <input type="text" class="form-control" name="nome_utente" aria-describedby="surnamelHelp">
            </div>

            <div class="mt-3 mb-3">

            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" class="form-control" name="password" aria-describedby="emailHelp">
        </div>

            <div class="mt-3 mb-3">

            <label for="inputPassword1" class="form-label border-secondary">Password</label>
            <input type="password" name="password" class="form-control" aria-describedby="passwordHelpBlock">
            <div id="passwordHelpBlock" class="form-text">
            Your password must be 8-32 characters long, contain letters and numbers, and must not contain spaces or emoji.
            </div>
        </div> 
            <div class="mt-3 mb-3">
            <button type="submit" class="btn btn-outline-secondary mb-3">Registrati</button>
            </div>
        </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>