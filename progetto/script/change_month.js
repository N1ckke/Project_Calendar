var calendar = document.getElementById("calendar");
var months = document.querySelectorAll(".month");
var events_btn = document.querySelectorAll(".visual-event");
const nameMonth = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto','Settembre','Ottobre','Novembre','Dicembre'];
const today = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

    // Inizializzazione del calendario al primo avvio 
function initCalendar(){
    setMonth(month)
    createCalendar(year, month);
}

    // Ritorna il giorno della settimana del primo giorno del mese esempio: 1 = lunedi'
function firstDayMonth(anno, mese) {
	let day = new Date(anno, mese, 1).getDay();
    if(day == 0){
        day = 7;
    }
    return day;
}
    // Ritorna il numero dei giorni in un mese
function daysMonth(anno, mese) {
        // Sistema l'annotazione dei mesi (dicembre = 0; novembre = 11)
        // console.log(mese);
        // console.log(nameMonth[mese]);
    if(mese == 11){
        mese = 0;
    }else{
        mese ++;
    }
        // console.log(mese);
        // console.log(nameMonth[mese]);

	return new Date(anno, mese, 0).getDate();
}
    // Crea il calendaro inserendone i giorni
function createCalendar(anno, mese) {
        // console.log("crea calendario");
    let loop = calendar.childElementCount; // Numero degli elementi presenti nel div con l'attributo "id=calendar"
        // Rimuove tutti gli elementi all'interno della pagina del calendario
    for(let i = 0; i < loop; i ++){
        calendar.removeChild(calendar.lastChild);
    }

	let firstDay = firstDayMonth(anno, mese);
	let monthDay = daysMonth(anno, mese);

        // console.log(mese);
        // console.log(monthDay);
        // console.log(firstDay);

        // Inserimento della barra con i giorni della settimana
    let weekDay = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
    for(let i =0; i<7; i++){
        let weekBar = document.createElement("div");

        weekBar.classList.add("week-day");
        weekBar.innerHTML= weekDay[i];

        calendar.appendChild(weekBar);
    }
    let day = 1;
    let monthStart = 1;
        // Inserimento delle caselle dei giorni fino all'ultimo giorno del mese
	while(day <= monthDay){
            // Inserimento di caselle vuote per posizionare correttamente i giorni in base al giorno della settimana
        if(monthStart < firstDay){
            let daysDiv = document.createElement("div");
            calendar.appendChild(daysDiv);
            monthStart++;
        }else{  // Inserisce le caselle dei giorni
            let daysDiv = document.createElement("div");
            if(day == today && mese == month){
                daysDiv.classList.add("today");
                daysDiv.innerHTML= day;
            }else{
                daysDiv.classList.add("day");
                daysDiv.innerHTML= day;
            }
                // Risolto
            checkEvents(mese, day, daysDiv);
            calendar.appendChild(daysDiv);
                // Da sistemare
            // visualEvent(mese, day);

            day ++;
        }
    }
}
    // Controlla se sono presenti eventi
function checkEvents(mese, giorno, div) {
    mese++;
        // console.log(mese);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/controlla_eventi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "true") {
                    addButtonEvent(div, mese, giorno);
                }
            }
        }
    };
    
    xhr.send("data=" + year + "-" + mese + "-" + giorno);
}
    //In caso siano presenti eventi aggiunge il bottone per visualizzarli
function addButtonEvent(div, mese, giorno) {
    let btn_event = document.createElement("button");
    btn_event.className = "visual-event";
    btn_event.onclick = function() {
        visualEvent(mese, giorno);
    };
    div.appendChild(btn_event);
}
    // Sostituisce la classe del mese selezionato con "active" e gli altri con "unactive"
function setMonth(mese){
    let i = 0;
    months.forEach(element => {
        if(i != mese){
                // console.log("unactive");
            element.classList.replace("active", "unactive");
        }else{
                // console.log("active");
            element.classList.replace("unactive", "active");
        }
        i++;
    });
}
    // Funzione che viene richiamata dai bottoni per cambiare il mese visualizzato
function changeMonth(event){
    let selectedMonth = event.target.value;
        // console.log(month + " month");
        // console.log(selectedMonth + " mese");
    setMonth(selectedMonth)
    createCalendar(year, selectedMonth);
}
    // Visualizza gli eventi presenti nel giorno selezionato
function visualEvent(mese, giorno) {
    //  TODO: Da completare AJAX da provare e addEvent() da completare
    let selectedDay = document.getElementById("selected-day");
    let selectedMonth = document.getElementById("selected-month");
    let selectedYear = document.getElementById("selected-year");

    selectedDay.innerText = giorno;
    selectedYear.innerText = year;
    selectedMonth.innerText = nameMonth[mese - 1];

    let div = document.getElementById("event-list-bar");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/controlla_eventi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "true") {
                    // TODO: Vedere cosa passare alla funzione 
                    // in base alla logica che si vuole adottare
                    let list = getEventList(mese, giorno);
                    div.appendChild(list);
                }
            } else {
                console.error("Errore nella richiesta: " + xhr.status);
            }
        }
    };
    // TODO: Realizzare il php e capire cosa richiedere al server
    xhr.send("data=" + year + "-" + mese + "-" + giorno);   
    
}
function getEventList(mese, giorno){
    // TODO: Da ragionare le AJAX e richiamare la funzione 
    // createEventDiv() all'interno dell'opportuno ciclo
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/visualizza_eventi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let eventi = JSON.parse(xhr.responseText);
                let eventList = document.querySelector(".event-list");
    
                if (eventList) {
                    eventList.innerHTML = "";
    
                    if (eventi.length > 0) {
                        let i = 0;
                        eventi.forEach(function(element) { 
                            eventList.appendChild(createEventDiv(element, i, mese, giorno));
                            i++;
                        });
                    } else {
                        eventList.textContent = "Non ci sono eventi programmati per questo giorno.";
                    }
                } else {
                    console.error("Elemento con classe 'event-list' non trovato.");
                }
            } else {
                console.error("Errore nella richiesta: " + xhr.status);
            }
        }
    };
    xhr.send("data=" + year + "-" + mese + "-" + giorno);

}

    //Elimina un evento
function eliminaEvento(event, id, data) {
    let eventDiv = document.getElementById("event-" + id);
    eventDiv.remove();
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/elimina_evento.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "success") {
                    console.log("Evento eliminato con successo");
                } else {
                    console.error("Errore durante l'eliminazione dell'evento: " + xhr.responseText);
                }
            } else {
                console.error("Errore nella richiesta: " + xhr.status);
            }
        }
    };
    
    xhr.send("titolo=" + event.titolo + "&data=" + data + "&ora=" + event.ora);
}

    // Crea gli eventi da aggiungere alla lista 
function createEventDiv(evento, id, mese, giorno) {

    let eventDiv = document.createElement("div");
    eventDiv.id = "event-" + id;
    eventDiv.classList.add("event-item");

    var title = document.createElement("div");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/controlla_ruolo.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                title.classList.add("collaboratore");
                    //TODO: Da rivedere il funzionamento del onmouseover
                // xhr = new XMLHttpRequest();
                // xhr.open("POST", "../includes/controlla_creatore.php", true);
                // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // xhr.onreadystatechange = function() {
                //     if (xhr.readyState === XMLHttpRequest.DONE) {
                //         if (xhr.status === 200) {
                //             title.addEventListener("onmouseover", function() {
                //                 title.setAttribute('title', xhr.responseText)
                //             });
                //         } else {
                //             console.error("Errore nella richiesta: " + xhr.status);
                //         }
                //     }
                // };
                
                // xhr.send("titolo=" + evento.titolo + "&data=" + year + mese + giorno + "&ora=" + evento.ora);
            } else {
                console.error("Errore nella richiesta: " + xhr.status);
            }
        }
    };

    xhr.send("Titolo=" + evento.titolo + "&data=" + year + mese + giorno + "&ora=" + evento.ora);

    title.classList.add("event-text");
    title.textContent = evento.titolo;

    let clock = document.createElement("div");
    
    let oraEvento = evento.ora.split(':');
    let ora = oraEvento[0] + ":" + oraEvento[1];

    clock.classList.add("event-clock");
    clock.textContent = ora;

    let icon = document.createElement("button");
    icon.type = "button";
    icon.classList.add("event-icon");
    icon.onclick = function() {
        let date = year + "-" + mese + "-" + giorno;
        eliminaEvento(evento, id, date);
    };
    eventDiv.appendChild(title);
    eventDiv.appendChild(clock);
    eventDiv.appendChild(icon);

    return eventDiv;
}

initCalendar();
    // Ascoltatore collegato al bottone per cambiare il mese
months.forEach(value => {
    value.addEventListener("click", changeMonth);
});
events_btn.forEach(value => {
    value.addEventListener("click", visualEvent);
});
