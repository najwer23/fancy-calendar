window.onload = function () {

    class Calendar {
        constructor(calendarId, date) {
            this.calendarId = calendarId
            let testDay = date.getDate();
            this.day = (testDay > 9) ? testDay : ("0" + testDay);
            let testMonth = date.getMonth();
            this.month = (testMonth > 8) ? (testMonth + 1) : ("0" + (testMonth + 1));
            this.year = date.getFullYear();

            this.months = [
                ["01","Jan"],
                ["02", "Feb"], 
                ["03", "Mar"],
                ["04", "Apr"], 
                ["05", "May"],
                ["06", "Jun"],
                ["07", "Jul"],
                ["08", "Aug"],
                ["09", "Sep"], 
                ["10", "Oct"], 
                ["11", "Nov"],
                ["12", "Dec"]
            ];
            this.monthsMap = new Map(this.months);

            this.fieldCalendar = [
                ["yearThousands", this.year.toString().substring(0, 2) + "00"],
                ["yearTens", this.year.toString().substring(2, 3) + "0"],
                ["yearUnits", this.year.toString().substring(3, 4)],
                ["monthRow", this.monthsMap.get(this.month.toString())],
                ["fourRow", this.day.toString().substring(0, 1)],
                ["dayUnits", this.day.toString().substring(1, 2)]
            ];
            this.fieldCalendarMap = new Map(this.fieldCalendar);

        }

        getDateForInput() {
            return this.year + "-" + this.month + "-" + this.day;
        }

        calendarButtonClick() {
            for (let key of this.fieldCalendarMap.keys()) {
                document.querySelectorAll("#" + this.calendarId + " ." + key).forEach(object => {
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

        colorForButtonsOnLoad() {
            for (let [key, value] of this.fieldCalendarMap) {
                document.querySelectorAll("#" + this.calendarId + " ." + key).forEach((object, index) => {
                    if (value == object.textContent) {
                        object.classList.add("clickedButtonCalendar");
                    }
                });
            }
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
            for (let key of this.fieldCalendarMap.keys()) {
                tempFieldCalendarClassName = key;
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
                        for (let [keyMonthsMap, valueMonthsMap] of this.monthsMap) {
                            if (object.textContent === valueMonthsMap) {
                                valMonthRow = keyMonthsMap;
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

            if (this.checkIfDateIsCorrect(this.year, this.month, this.day)) {
                this.removeClasses(tempFieldCalendarClassName, "clickedButtonCalendar");
                object.classList.add("clickedButtonCalendar");
                document.getElementById(this.calendarId + 'Input').value = this.getDateForInput();
            }
               
        }

        checkIfDateIsCorrect(year, month, day) {
            let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                monthLength[1] = 29;

            return day > 0 && day <= monthLength[month - 1];
        }

    }


    init();

    function init() {

        let dateNow = new Date();

        let myCalendars = [];
        
        const birthdayCalendar = new Calendar("birthdayCalendar", dateNow);
        
        myCalendars.push(birthdayCalendar);
        
        for (let i = 0; i < myCalendars.length; i++) {
            document.querySelector("#" + myCalendars[i].calendarId + 'Input').value = birthdayCalendar.getDateForInput();
            
            document.querySelectorAll("#" + myCalendars[i].calendarId + ' .' + myCalendars[i].calendarId + "Click").forEach(object => {
                object.addEventListener('click', function () {
                    calendarInputClick(myCalendars[i].calendarId);
                }.bind())
            });

            myCalendars[i].colorForButtonsOnLoad();
            myCalendars[i].calendarButtonClick();
        }
    }

    function calendarInputClick(nameCalendar) {
        const calendar = document.querySelector("."+nameCalendar+"List");
        calendar.classList.toggle('calendarActive');
    }

}