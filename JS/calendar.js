window.onload = function () {

    let Calendarfield = [".yearThousands", ".yearTens", ".yearUnits", ".monthRow", ".fourRow", ".dayUnits"]
    let CalendarId = ["birthdayCalendar"];

    init ();

    function init () {
        for (let i=0; i<CalendarId.length; i++) {
            buildInputValForCalendar(CalendarId[i]);
            calendarButtonClick(CalendarId[i]);
        }
    }

    function buildInputValForCalendar(calendarId){
        let todayDate = new Date()
        let testToday = todayDate.getDate();
        let dayToday = (testToday > 9) ? testToday : ("0" + testToday);
        let testMonth = todayDate.getMonth();
        let monthToday = (testMonth > 8) ? (testMonth + 1) : ("0" + (testMonth+1));
        let yearToday = todayDate.getFullYear();

        let date = dayToday + "-" + monthToday + "-" + yearToday;
        document.getElementById(calendarId + 'Input').value = date;
    
        //TODO set date at calendar
    }

    function calendarButtonClick (calendarId) {
        for (let i = 0; i < Calendarfield.length; i++) {
            document.querySelectorAll("#" + calendarId + " " + Calendarfield[i]).forEach(object => {
                object.addEventListener('click', function () {
                    rebuildInputValForCalendarAfterButtonClick(object, calendarId)
                })
            });
        }
    }
   
    function rebuildInputValForCalendarAfterButtonClick(object, calendarId){
        let val = object.textContent;
        console.log(object.className+" "+val)

        let valNow = document.getElementById(calendarId+'Input').value;
        document.getElementById(calendarId + 'Input').value = valNow+val;

        //TODO set new date in input

        //TODO remove old pick
        
        //TODO set date at calendar, add class
    }

    //TODO validation DATE
}