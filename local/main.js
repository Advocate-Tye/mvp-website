let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Sepember", "October", "November", "December"];

 let eventData = {
    "events": [
        {
            "description": 'es',
            "year": '2018',
            "month": 'Nov',
            "day": '28'
        }
    ]
 };

let headerMonths = document.getElementsByClassName('month')[0];
let headerYears = document.getElementsByClassName('year')[0];
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');

selectYear.value=currentYear;
selectMonth.value=currentMonth;

next.addEventListener('click', nextMonth);
prev.addEventListener('click', previousMonth);
selectYear.addEventListener('input', (event)=> {
    if(event.keyCode == 13) {
        event.preventDefault();
        return false;
    } else {
        jump();
    }
})
selectMonth.addEventListener('change', jump);

showCalendar(currentMonth,currentYear);
showEvents();

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    let tbl = document.getElementsByClassName("calendar-days")[0]; // body of the calendar

    tbl.innerHTML = "";

    headerMonths.innerHTML = months[month];
    headerYears.innerHTML = year;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                }
                cell.classList.add('day');
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }
}

function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
    showEvents();
}

function previousMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    showEvents();
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
    showEvents();
}


function daysInMonth (month, year) {
    return new Date(year, month+1, 0).getDate();
}

document.addEventListener('click',function(e){
    if(!e.target.classList.contains('active') && e.target.classList.contains('day')){
        if(document.getElementsByClassName('active')[0] === undefined){
            e.target.classList.add('active');
        }
        document.getElementsByClassName('active')[0].classList.remove('active');
        if(document.getElementsByClassName('active')[0] === undefined){
            e.target.classList.add('active');
        }
        e.target.classList.add('active');
    } else if(e.target.classList.contains('active')===null && e.target.classList.contains('day')){
        e.target.classList.add('active');
    }
 });

 let newEvent = {
    desc: document.querySelector('#new-event-desc'),
    month: headerMonths,
    year: headerYears,
    active: document.getElementsByClassName('active'),
    submit: ()=>{
        if(newEvent.desc.value.length===0) {
            newEvent.desc.classList.add('error');
            newEvent.desc.style.border='4px solid red';
        } else {
            newEventJson(newEvent.desc.value, newEvent.month.innerHTML, newEvent.year.innerHTML, newEvent.active[0].innerHTML);
            hideShowEventsDiv();
            showEventText(newEvent.desc.value);
            newEvent.desc.classList.remove('error');
            newEvent.desc.style.border='none';
            newEvent.clear();
        }
    },
    clear: ()=>{
        newEvent.desc.value='';
    }
 };

 const hideShowEventsDiv = ()=> {
     let eventsDiv = document.querySelector('.events');
     let newEventForm = document.querySelector('.new-event-form');
     let saveEventButton = document.querySelector('.submit-event');
     let showEventForm = document.querySelector('.show-event-form');

     if(eventsDiv.classList.contains('hidden')){
        newEventForm.classList.add('hidden');
        newEventForm.classList.remove('visible');
        eventsDiv.classList.remove('hidden');
        eventsDiv.classList.add('visible');
        showEvents();

        saveEventButton.classList.remove('rotate');
        showEventForm.classList.add('rotate');
     } else {

        eventsDiv.classList.remove('visible');
        eventsDiv.classList.add('hidden');
        newEventForm.classList.remove('hidden');
        newEventForm.classList.add('visible');
        showEventForm.classList.remove('rotate');
        saveEventButton.classList.add('rotate');
     }
 }

 document.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('rotate') && e.target.classList.contains('submit-event')){
        newEvent.submit();
    } else if(e.target.classList.contains('rotate')) {
        hideShowEventsDiv();
    }
 });

function showEvents () {
    let days = document.getElementsByClassName('day');
    let events = [];
    [...eventData['events']].forEach((event)=>{
        [...days].forEach((day)=>{
            if(event['day']===day.innerHTML && event['month']===headerMonths.innerHTML && event['year']===headerYears.innerHTML){
                day.classList.add('active-event');
                events.push(event)
            }
        });
    });
    return events;
}

function clearEventText() {
    if(document.getElementsByClassName('event-desc')){
        [...document.getElementsByClassName('event-desc')].forEach((event)=>{
            event.outerHTML='';
        });
    }
}

function showEventText(desc) {

    let noEvents = document.getElementsByClassName('no-Events')[0];
    let eventsDescContainer = document.querySelector('.events');

        const span = document.createElement('span');
        let EventText = document.createTextNode(desc);;

        const remove = document.createElement('div');
        let x = document.createTextNode('x');

        noEvents.classList.remove('show');
        noEvents.style.display='none';

        span.appendChild(EventText)
        span.appendChild(remove);
        span.classList.add('event-desc', 'event-message');
        eventsDescContainer.appendChild(span);
}

const checkEvents = (obj, date)=>{
    let isInArray = eventData['events'].find(event => event[obj]===date)
    return isInArray;
}

document.addEventListener('click', (e)=> {
    let noEvents = document.getElementsByClassName('no-Events')[0];

    if(e.target.classList.contains('day')){
        clearEventText();

        if(eventData.events.length===0){
            noEvents.style.display='initial';
            noEvents.innerHTML = `There are no events on ${headerMonths.innerHTML} ${e.target.innerHTML}, ${headerYears.innerHTML}.`;
        } else {
            [...eventData['events']].forEach((event)=>{
                if(event['day']===e.target.innerHTML && event['month']===headerMonths.innerHTML && event['year']===headerYears.innerHTML){

                    showEventText(event['description']);

                }  else if(!checkEvents('year',headerYears.innerHTML) || !checkEvents('month', headerMonths.innerHTML) || !checkEvents('day', e.target.innerHTML))  {
                    clearEventText();
                    noEvents.style.display='initial';
                    noEvents.innerHTML = `There are no events on ${headerMonths.innerHTML} ${e.target.innerHTML}, ${headerYears.innerHTML}.`;
                }
            });
        }
    }
});

document.addEventListener('click', (x)=>{

    let day = document.getElementsByClassName('active')[0];
    let noEvents = document.getElementsByClassName('no-Events')[0];

    if(x.target.classList.contains('remove')){
        let eventText = x.target.parentNode.textContent.slice(0,-1);

        for(var i = eventData.events.length-1; i >= 0; --i) {
            if(eventData.events[i]['day']===day.innerHTML && eventData.events[i]['month']===headerMonths.innerHTML && eventData.events[i]['year']===headerYears.innerHTML && eventData.events[i]['description']===eventText){
                eventData.events.splice(i,1);

                x.target.parentNode.classList.add('swingHide');
                setInterval(()=>{
                    x.target.parentNode.outerHTML='';
                },500);

                if(!checkEvents('year',headerYears.innerHTML) || !checkEvents('month', headerMonths.innerHTML) || !checkEvents('day', day.innerHTML)){
                    setTimeout(()=>{
                        noEvents.style.display='initial';
                    },600)
                    noEvents.innerHTML = `There are no events on ${headerMonths.innerHTML} ${day.innerHTML} ${headerYears.innerHTML}`;
                    day.classList.remove('active-event');
                }

                if(checkEvents('year',headerYears.innerHTML) && checkEvents('month', headerMonths.innerHTML) & checkEvents('day', day.innerHTML)){
                    showEventText(eventData.events[i].description);
                }
            }
        }
    }
});

function newEventJson(description, month, year, day){
    let event = {
        "description": description,
        "year": year,
        "month": month,
        "day": day
     };
     eventData.events.push(event);
 }
