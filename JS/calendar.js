window.onload = function () {

    class Calendar {
        constructor(calendarId, date) {
            this.calendarId = calendarId
            let testDay = date.getDate();
            this.day = (testDay > 9) ? testDay : ("0" + testDay);
            let testMonth = date.getMonth();
            this.month = (testMonth > 8) ? (testMonth + 1) : ("0" + (testMonth + 1));
            this.year = date.getFullYear();

            this.monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Oct", "Dec"];
            this.fieldCalendarClassName = ["yearThousands", "yearTens", "yearUnits", "monthRow", "fourRow", "dayUnits"];
        }

        getDateForInput() {
            return this.year + "-" + this.month + "-" + this.day;
        }

        calendarButtonClick() {
            for (let i = 0; i < this.fieldCalendarClassName.length; i++) {
                document.querySelectorAll("#" + this.calendarId + " ." + this.fieldCalendarClassName[i]).forEach(object => {
                    object.addEventListener('click', function () {
                        this.rebuildInputValForCalendarAfterButtonClick(object)
                    }.bind(this))
                });
            }
        }

        removeClasses(className, removedClassName) {
            document.querySelectorAll("#" + this.calendarId + " ." + className).forEach(e => {
                e.classList.remove(removedClassName);
            });
        }

        rebuildInputValForCalendarAfterButtonClick(object) {
            let valNow = document.getElementById(this.calendarId + 'Input').value;

            let valYearThousands = valNow.substring(0, 2);
            let valYearTens = valNow.substring(2, 3);
            let valYearUnits = valNow.substring(3, 4);
            let valMonthRow = valNow.substring(5, 7);
            let valFourRow = valNow.substring(8, 9);
            let valDayUnits = valNow.substring(9, 10);

            let tempFieldCalendarClassName = "";
            for(let i=0; i<this.fieldCalendarClassName.length; i++) {
                tempFieldCalendarClassName = this.fieldCalendarClassName[i];
                if (object.className.indexOf(tempFieldCalendarClassName) !== -1) {
                    if (tempFieldCalendarClassName === "yearThousands") {
                        valYearThousands = object.textContent.substring(0, 2);
                        break;
                    }
                    if (tempFieldCalendarClassName === "yearTens") {
                        valYearTens = object.textContent.substring(0, 1);
                        break;
                    }
                    if (tempFieldCalendarClassName === "yearUnits") {
                        valYearUnits = object.textContent;
                        break;
                    }
                    if (tempFieldCalendarClassName === "monthRow") {
                        for (let j = 0; j < this.monthsName.length; j++) {
                            if (object.textContent === this.monthsName[j] ) {
                                valMonthRow = (j > 9) ? (j + 1) : ("0" + (j + 1));
                            }
                        }
                        break;
                    }
                    if (tempFieldCalendarClassName === "fourRow") {
                        valFourRow = object.textContent;
                        break;
                    }
                    if (tempFieldCalendarClassName === "dayUnits") {
                        valDayUnits = object.textContent;
                        break;
                    }
                }
            }

            this.year = valYearThousands + valYearTens + valYearUnits
            this.month = valMonthRow;
            this.day = valFourRow + valDayUnits

            if (this.day != "00") {
                this.removeClasses(tempFieldCalendarClassName, "clickedButtonCalendar");
                object.classList.add("clickedButtonCalendar");
                document.getElementById(this.calendarId + 'Input').value = this.getDateForInput();
            }
               
        }

    }


    init();

    function init() {

        let dateNow = new Date();

        let myCalendars = [];
        
        const birthdayCalendar = new Calendar("birthdayCalendar", dateNow);

        myCalendars.push(birthdayCalendar);
        
        for (let i = 0; i < myCalendars.length; i++) {
            document.getElementById(myCalendars[i].calendarId + 'Input').value = birthdayCalendar.getDateForInput();
            //TODO podswietlany buttony na start
            myCalendars[i].calendarButtonClick();
        }
    }

    // function buildInputValForCalendar(calendarId){
    //     let todayDate = new Date()
    //     let testToday = todayDate.getDate();
    //     let dayToday = (testToday > 9) ? testToday : ("0" + testToday);
    //     let testMonth = todayDate.getMonth();
    //     let monthToday = (testMonth > 8) ? (testMonth + 1) : ("0" + (testMonth+1));
    //     let yearToday = todayDate.getFullYear();

    //     let date = yearToday + "-" + monthToday + "-" + dayToday;
    //     document.getElementById(calendarId + 'Input').value = date;

    //     for (let i = 0; i < CalendarField.length; i++) {
    //         document.querySelectorAll("#" + calendarId + " ." + CalendarField[i]).forEach(object => {
    //             // if (object.innerHTML === 
    //         });
    //     }
    // }

    // function calendarButtonClick (calendarId) {
    //     for (let i = 0; i < CalendarField.length; i++) {
    //         document.querySelectorAll("#" + calendarId + " ." + CalendarField[i]).forEach(object => {
    //             object.addEventListener('click', function () {
    //                 rebuildInputValForCalendarAfterButtonClick(object, calendarId)
    //             })
    //         });
    //     }
    // }

    // function rebuildInputValForCalendarAfterButtonClick(object, calendarId){

    //     let valNow = document.getElementById(calendarId + 'Input').value;
    //     let partDateInInput = object.textContent;

    //     let valYearThousands = valNow.substring(0, 2);
    //     let valYearTens = valNow.substring(2, 3);
    //     let valYearUnits = valNow.substring(3, 4);
    //     let valMonthRow = valNow.substring(5, 7);
    //     let valFourRow = valNow.substring(8, 9);
    //     let valDayUnits = valNow.substring(9, 10);

    //     let toggleClassName = "clickedButtonCalendar";

    //     for(let i=0; i<CalendarField.length; i++) {
    //         if (object.className.indexOf(CalendarField[i]) !== -1) {
    //             if (CalendarField[i] === "yearThousands") {
    //                 removeClasses(calendarId, CalendarField[i], toggleClassName);
    //                 valYearThousands = partDateInInput.substring(0, 2);
    //                 object.classList.add(toggleClassName);
    //                 break;
    //             }
    //             if (CalendarField[i] === "yearTens") {
    //                 removeClasses(calendarId, CalendarField[i], toggleClassName);
    //                 valYearTens = partDateInInput.substring(0, 1);
    //                 object.classList.add(toggleClassName);
    //                 break;
    //             }
    //             if (CalendarField[i] === "yearUnits") {
    //                 removeClasses(calendarId, CalendarField[i], toggleClassName);
    //                 valYearUnits = partDateInInput;
    //                 object.classList.add(toggleClassName);
    //                 break;
    //             }
    //             if (CalendarField[i] === "monthRow") {
    //                 removeClasses(calendarId, CalendarField[i], toggleClassName);
    //                 for (let j=0; j<Months.length; j++) {
    //                     if (partDateInInput === Months[j] ) {
    //                         valMonthRow = (j > 9) ? (j + 1) : ("0" + (j + 1));
    //                     }
    //                 }
    //                 object.classList.add(toggleClassName);
    //                 break;
    //             }
    //             if (CalendarField[i] === "fourRow") {
    //                 removeClasses(calendarId, CalendarField[i], toggleClassName);
    //                 valFourRow = partDateInInput;
    //                 object.classList.add(toggleClassName);
    //                 break;
    //             }
    //             if (CalendarField[i] === "dayUnits") {
    //                 removeClasses(calendarId, CalendarField[i], toggleClassName);
    //                 valDayUnits = partDateInInput;
    //                 object.classList.add(toggleClassName);
    //                 break;
    //             }
    //         }
    //     }

    //     document.getElementById(calendarId + 'Input').value = valYearThousands + valYearTens + valYearUnits + "-" + valMonthRow + "-" + valFourRow + valDayUnits;
    // }

    // function removeClasses(calendarId, className, removedClassName) {
    //     document.querySelectorAll("#" + calendarId + " ." + className).forEach(e => {
    //         e.classList.remove(removedClassName);
    //     });
    // }

    // //TODO validation DATE
}