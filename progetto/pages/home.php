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
    <link href="../style/home.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp" rel="stylesheet" />
    <title>Calendario</title>
</head>
<body>
    <div class="container">
            <!-- Barra laterale per visualizzare il giorno e gli eventi di quel giorno -->
        <aside>
            <div class="day-month-event">
                <div class="selected-day-month">
                    <span id="selected-day" class="selected-day"></span>
                    <span id="selected-month" class="selected-month">Visualizza eventi</span>
                    <span id="selected-year" class="selected-year"></span>
                </div>
                    <!-- Bottone che reindirizza ad una pagiona per aggiungere un altro evento nel giorno selezionato -->
                <button onclick="nota()" class="new-event-btn">+ Nuovo evento</button>
                <script>
                        function nota() {
                            window.location.href = 'nuova_nota.php';
                        }
                </script>
                <div class="event-list-bar">
                    <div class="scheduled-event">Eventi Programmati</div>
                    <!-- Da rimuovere si aggiungera' poi in automatico -->
                    <div class="event-list">
                        <!-- INIZIO RIMOZIONE -->
                    <!-- <div class="event-text">Non sono presenti eventi programmati</div>
                    <div class="event-clock"></div>
                    <button class="event-icon"></button> -->
                        <!-- FINE RIMOZIONE -->
                    </div>
                </div>
            </div>
        </aside>
        <header>
                <!-- Barra per visualizzare l'utente e disconnettersi -->
            <div class="user-bar">
                <div class="action">    
                    <span class="username">
                        <?php
                            echo $_SESSION["nome_utente"];
                        ?>
                    </span>
                    <button onclick="logout()" class="logout">Logout</button>
                    <script>
                        function logout() {
                            window.location.href = '../includes/logout.php';
                        }
                    </script>
                </div>
            </div>
        </header>
        <div class="calendar">
                <!-- Barra per visualizzare e selezionare i mesi -->
            <header>
                <div class="month-bar">
                    <button id="gennaio" class="month unactive" value="0" onclick="changeMonth()">GEN</button> 
                    <button id="febbraio" class="month unactive" value="1" onclick="changeMonth()">FEB</button>
                    <button id="marzo"class="month unactive" value="2" onclick="changeMonth()">MAR</button>
                    <button id="aprile" class="month unactive"value="3" onclick="changeMonth()">APR</button>
                    <button id="maggio" class="month unactive" value="4" onclick="changeMonth()">MAG</button>
                    <button id="giugno" class="month unactive" value="5" onclick="changeMonth()">GIU</button>
                    <button id="luglio" class="month unactive" value="6" onclick="changeMonth()">LUG</button>
                    <button id="agosto" class="month unactive" value="7" onclick="changeMonth()">AGO</button>
                    <button id="settembre" class="month unactive" value="8" onclick="changeMonth()">SET</button>
                    <button id="ottobre" class="month unactive" value="9" onclick="changeMonth()">OTT</button>
                    <button id="novembre" class="month unactive" value="10" onclick="changeMonth()">NOV</button>
                    <button id="dicembre" class="month unactive" value="11" onclick="changeMonth()">DIC</button>
                </div>
            </header>
            <div class="calendar-page">        
                    <!-- Pagina del calendario con all'interno i giorni in base al mese -->
                <div id="calendar" class="calendar-days">
                </div>
            </div>
        </div>
    </div>
</body>
    <script src="../script/change_month.js"></script>
</html>
