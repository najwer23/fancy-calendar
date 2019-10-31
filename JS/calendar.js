window.onload = function () {

    let Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Oct", "Dec"];
    let CalendarField = ["yearThousands", "yearTens", "yearUnits", "monthRow", "fourRow", "dayUnits"]
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

        let date = yearToday + "-" + monthToday + "-" + dayToday;
        document.getElementById(calendarId + 'Input').value = date;
    
        //TODO set date at calendar
    }

    function calendarButtonClick (calendarId) {
        for (let i = 0; i < CalendarField.length; i++) {
            document.querySelectorAll("#" + calendarId + " ." + CalendarField[i]).forEach(object => {
                object.addEventListener('click', function () {
                    rebuildInputValForCalendarAfterButtonClick(object, calendarId)
                })
            });
        }
    }
   
    function rebuildInputValForCalendarAfterButtonClick(object, calendarId){
        
        let valNow = document.getElementById(calendarId + 'Input').value;
        let partDateInInput = object.textContent;
        
        let valYearThousands = valNow.substring(0, 2);
        let valYearTens = valNow.substring(2, 3);
        let valYearUnits = valNow.substring(3, 4);
        let valMonthRow = valNow.substring(5, 7);
        let valFourRow = valNow.substring(8, 9);
        let valDayUnits = valNow.substring(9, 10);

        let toggleClassName = "clickedButtonCalendar";

        for(let i=0; i<CalendarField.length; i++) {
            if (object.className.indexOf(CalendarField[i]) !== -1) {
                if (CalendarField[i] === "yearThousands") {
                    removeClasses(calendarId, CalendarField[i], toggleClassName);
                    valYearThousands = partDateInInput.substring(0, 2);
                    object.classList.add(toggleClassName);
                    break;
                }
                if (CalendarField[i] === "yearTens") {
                    removeClasses(calendarId, CalendarField[i], toggleClassName);
                    valYearTens = partDateInInput.substring(0, 1);
                    object.classList.add(toggleClassName);
                    break;
                }
                if (CalendarField[i] === "yearUnits") {
                    removeClasses(calendarId, CalendarField[i], toggleClassName);
                    valYearUnits = partDateInInput;
                    object.classList.add(toggleClassName);
                    break;
                }
                if (CalendarField[i] === "monthRow") {
                    removeClasses(calendarId, CalendarField[i], toggleClassName);
                    for (let j=0; j<Months.length; j++) {
                        if (partDateInInput === Months[j] ) {
                            valMonthRow = (j > 9) ? (j + 1) : ("0" + (j + 1));
                        }
                    }
                    object.classList.add(toggleClassName);
                    break;
                }
                if (CalendarField[i] === "fourRow") {
                    removeClasses(calendarId, CalendarField[i], toggleClassName);
                    valFourRow = partDateInInput;
                    object.classList.add(toggleClassName);
                    break;
                }
                if (CalendarField[i] === "dayUnits") {
                    removeClasses(calendarId, CalendarField[i], toggleClassName);
                    valDayUnits = partDateInInput;
                    object.classList.add(toggleClassName);
                    break;
                }
            }
        }
        
        document.getElementById(calendarId + 'Input').value = valYearThousands + valYearTens + valYearUnits + "-" + valMonthRow + "-" + valFourRow + valDayUnits;
    }

    function removeClasses(calendarId, className, removedClassName) {
        document.querySelectorAll("#" + calendarId + " ." + className).forEach(e => {
            e.classList.remove(removedClassName);
        });
    }
    
    //TODO validation DATE
}