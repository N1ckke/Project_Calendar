CREATE TABLE utenti (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40),
    cognome VARCHAR(40),
    nome_utente VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(32)
);


CREATE TABLE note(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(100),
    data_evento DATE,
    ora_evento TIME,
    ultima_modifica DATETIME default NOW()
);

CREATE TABLE utenti_note (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_nota INT,
    ID_utente INT,
    ruolo VARCHAR(30)
);
