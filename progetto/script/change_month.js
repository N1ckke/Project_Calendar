var calendar = document.getElementById("calendar");
var months = document.querySelectorAll(".month");
var events_btn = document.querySelectorAll(".visual-event");
const nameMonth = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto','Settembre','Ottobre','Novembre','Dicembre'];
const today = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
var selectedMonth;
var selectedDay;

function initCalendar(){
    setMonth(month)
    createCalendar(month, today);

    let selectedDay = document.getElementById("selected-day");
    let selectedMonth = document.getElementById("selected-month");
    let selectedYear = document.getElementById("selected-year");

    selectedDay.innerText = today;
    selectedYear.innerText = year;
    selectedMonth.innerText = nameMonth[month];
}

function firstDayMonth(mese) {
    let day = new Date(year, mese, 1).getDay();
    if(day == 0){
        day = 7;
    }
    return day;
}

function daysMonth(mese) {
    if(mese == 11){
        mese = 0;
    }else{
        mese ++;
    }
    return new Date(year, mese, 0).getDate();
}

function createCalendar(mese, giorno) {
    let loop = calendar.childElementCount;
    for(let i = 0; i < loop; i ++){
        calendar.removeChild(calendar.lastChild);
    }

    let nextMonth = mese + 1;
    let nextYear = year;
    if (nextMonth === 12) {
        nextMonth = 0;
        nextYear++;
    }

    let firstDay = firstDayMonth(nextMonth);
    let monthDay = daysMonth(nextMonth);

    let weekDay = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
    for(let i =0; i<7; i++){
        let weekBar = document.createElement("div");
        weekBar.classList.add("week-day");
        weekBar.innerHTML= weekDay[i];
        calendar.appendChild(weekBar);
    }
    let day = 1;
    let monthStart = 1;
    while(day <= monthDay){
        if(monthStart < firstDay){
            let daysDiv = document.createElement("div");
            calendar.appendChild(daysDiv);
            monthStart++;
        }else{
            let daysDiv = document.createElement("div");
            if(day != giorno){
                daysDiv.classList.add("day");
                daysDiv.innerHTML= day;
            }else{
                daysDiv.classList.add("today");
                daysDiv.innerHTML= day;
            }
            checkEvents(mese, day, daysDiv);
            calendar.appendChild(daysDiv);
            day ++;
        }
    }
    selectedMonth = nextMonth;
    selectedDay = giorno;
}

function setMonth(mese){
    let i = 0;
    months.forEach(element => {
        if(i != mese){
            element.classList.replace("active", "unactive");
        }else{
            element.classList.replace("unactive", "active");
        }
        i++;
    });
}

function changeMonth(event){
    let selectedMonth = event.currentTarget.value;
    let monthTxt = document.getElementById("selected-month");
    let dayTxt = document.getElementById("selected-day");
    let lastDay = daysMonth(selectedMonth);  
    if(today > lastDay){
        monthTxt.innerText = nameMonth[selectedMonth];
        dayTxt.innerText = lastDay;
        setMonth(selectedMonth);
        createCalendar(selectedMonth, lastDay);
    }else{
        monthTxt.innerText = nameMonth[selectedMonth];
        dayTxt.innerText = today;
        setMonth(selectedMonth);
        createCalendar(selectedMonth, today);
    }
}

function visualEvent(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/visualizza_eventi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var eventi = JSON.parse(xhr.responseText);
                if (eventi.length > 0) {
                    var eventList = document.querySelector(".event-list");
                    eventList.innerHTML = "";
                    eventi.forEach(function(evento, index) {
                        var item = document.createElement("div");
                        item.classList.add("evento-item");
                        item.setAttribute("id", "evento-" + index);
                        var title = document.createElement("div");
                        title.textContent = evento.titolo;
                        var ora = document.createElement("div");
                        ora.innerHTML = evento.ora_evento;
                        var btnElimina = document.createElement("button");
                        btnElimina.classList.add("event-icon");
                        btnElimina.onclick = function() {
                            eliminaEvento(evento.ID);
                        };
                        item.appendChild(title);
                        item.appendChild(ora);
                        item.appendChild(btnElimina);
                        eventList.appendChild(item);
                    });
                } else {
                    document.querySelector(".event-text").textContent = "Non ci sono eventi programmati per questo giorno.";
                }
            } else {
                console.error("Errore nella richiesta: " + xhr.status);
            }
        }
    };
    xhr.send("data=" + data);
}

function eliminaEvento(id) {
    var eventDiv = document.getElementById("event-" + id);
    eventDiv.remove();
}



// function createEventDiv(evento, id) {
//     var eventDiv = document.createElement("div");
//     eventDiv.id = "event-" + id;
//     eventDiv.classList.add("event-item");

//     var title = document.createElement("span");
//     title.textContent = evento.titolo;

//     var ora = document.createElement("span");
//     ora.textContent = evento.ora;

//     var btn = document.createElement("button");
//     btn.className = "event-icon";
//     btn.onclick = function() {
//         eliminaEvento(id);
//     };

//     eventDiv.appendChild(title);
//     eventDiv.appendChild(ora);
//     eventDiv.appendChild(btn);

//     return eventDiv;
// }


initCalendar();
months.forEach(value => {
    value.addEventListener("click", changeMonth);
});
events_btn.forEach(value => {
    value.addEventListener("click", visualEvent);
});

function checkEvents(mese, giorno, div) {
    var xhr = new XMLHttpRequest();
    var tempMese;
    xhr.open("POST", "../includes/controlla_eventi.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "true") {
                    addButtonEvent(div, mese, giorno);
                }
            } else {
                console.error("Errore nella richiesta: " + xhr.status);
            }
        }
    };
    
    xhr.send("data=" + year + "-" + mese + "-" + giorno);
}

function addButtonEvent(div, mese, day) {
    var btn_event = document.createElement("button");
    btn_event.className = "visual-event";
    btn_event.onclick = function() {
        visualEvent(year, mese, day, selectedMonth);
    };
    div.appendChild(btn_event);
}