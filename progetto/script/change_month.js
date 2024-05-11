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
    createCalendar(year, month, today);

    let selectedDay = document.getElementById("selected-day");
    let selectedMonth = document.getElementById("selected-month");
    let selectedYear = document.getElementById("selected-year");

    selectedDay.innerText = today;
    selectedYear.innerText = year;
    selectedMonth.innerText = nameMonth[month];
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
    if(mese == 11){
        mese = 0;
    }else{
        mese ++;
    }
	return new Date(anno, mese, 0).getDate();
}
    // Crea il calendaro inserendone i giorni
function createCalendar(anno, mese, giorno) {
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
            if(day != giorno){
                daysDiv.classList.add("day");
                daysDiv.innerHTML= day;
            }else{
                daysDiv.classList.add("today");
                daysDiv.innerHTML= day;
            }

            // TODO: Chiamate php per controllare la presenza di eventi nel giorno che sta venendo aggiunto
            // Bottone da aggiungere in caso di evento 
            // <button class="visual-event" onclick="visualEvent()"></button>
            calendar.appendChild(daysDiv);

            day ++;
        }
    }
}
    // Sostituisce la classe del mese selezionato con "active" e gli altri con "unactive"
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
    // Funzione che viene richiamata dai bottoni per cambiare il mese visualizzato
function changeMonth(event){
    let selectedMonth = event.currentTarget.value;
    let monthTxt = document.getElementById("selected-month");
    let dayTxt = document.getElementById("selected-day");
        // console.log(selectedMonth);
    if(selectedMonth != month){
        monthTxt.innerText = nameMonth[selectedMonth];
        dayTxt.innerText = 1;
        setMonth(selectedMonth)
        createCalendar(year, selectedMonth, 1);
    }else{
        monthTxt.innerText = nameMonth[month];
        dayTxt.innerText = today;
        setMonth(month)
        createCalendar(year, month, today);
    }
}

function visualEvent(){
    // TODO: Funzione per visualizzare gli eventi di un determinato giorno selezionato dall'utente

}

    // console.log(months);
    // console.log(nameMonth);
    // console.log(month);

initCalendar();
    // Ascoltatore collegato al bottone per cambiare il mese
months.forEach(value => {
    value.addEventListener("click", changeMonth);
});
events_btn.forEach(value => {
    value.addEventListener("click", visualEvent);
});