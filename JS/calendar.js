window.onload = function () {

    class Calendar {
        constructor(nameCalendarId, date) {
            this.nameCalendarId = nameCalendarId
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

            this.fieldsCalendar = [
                ["yearThousands", this.year.toString().substring(0, 2) + "00"],
                ["yearTens", this.year.toString().substring(2, 3) + "0"],
                ["yearUnits", this.year.toString().substring(3, 4)],
                ["monthRow", this.monthsMap.get(this.month.toString())],
                ["fourRow", this.day.toString().substring(0, 1)],
                ["dayUnits", this.day.toString().substring(1, 2)]
            ];
            this.fieldsCalendarMap = new Map(this.fieldsCalendar);

        }

        getDateForInput() {
            let date = new Date(this.year + "-" + this.month + "-" + this.day);
            let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let nameDay = (Number.isNaN(date.getDay())) ? "Uups!" : weekday[date.getDay()];
            
            return this.year + "-" + this.month + "-" + this.day + ", " + nameDay;
        }

        calendarButtonClick() {

            for (let key of this.fieldsCalendarMap.keys()) {
                document.querySelectorAll("#" + this.nameCalendarId + " ." + key).forEach(object => {
                    object.addEventListener('click', function () {
                        this.rebuildInputValForCalendarAfterButtonClick(object)
                    }.bind(this))
                });
            }
        }

        removeClasses(className, removeClassName) {
            document.querySelectorAll("#" + this.nameCalendarId + " ." + className).forEach(e => {
                e.classList.remove(removeClassName);
            });
        }

        colorForButtonsOnLoad() {
            for (let [key, value] of this.fieldsCalendarMap) {
                document.querySelectorAll("#" + this.nameCalendarId + " ." + key).forEach((object, index) => {
                    if (value == object.textContent) {
                        object.classList.add("clickedButtonCalendar");
                    }
                });
            }
        }

        rebuildInputValForCalendarAfterButtonClick(object) {
            let valNow = document.getElementById(this.nameCalendarId + 'Input').value;

            let valYearThousands = valNow.substring(0, 2);
            let valYearTens = valNow.substring(2, 3);
            let valYearUnits = valNow.substring(3, 4);
            let valMonthRow = valNow.substring(5, 7);
            let valFourRow = valNow.substring(8, 9);
            let valDayUnits = valNow.substring(9, 10);

            let tempFieldCalendarClassName = "";
            for (let key of this.fieldsCalendarMap.keys()) {
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

            //let show wrong date too
            this.removeClasses(tempFieldCalendarClassName, "clickedButtonCalendar");
            object.classList.add("clickedButtonCalendar");
            document.getElementById(this.nameCalendarId + 'Input').value = this.getDateForInput();


            if (this.checkIfDateIsCorrect(this.year, this.month, this.day)) {
                document.querySelector("#" + this.nameCalendarId + " .inputHelpInfo").innerHTML = "<span style=\"color: green\">Format Date is ok!</span>"
            } else {
                document.querySelector("#" + this.nameCalendarId + " .inputHelpInfo").innerHTML = "<span style=\"color: red\">Format Date is wrong!</span>"
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

        let element = '';
        
        for (let i = 0; i < myCalendars.length; i++) {
            document.querySelector("#" +  myCalendars[i].nameCalendarId + 'Input').value = myCalendars[i].getDateForInput();
            
            document.querySelectorAll("#" + myCalendars[i].nameCalendarId + " .calendarClick").forEach(object => {
                object.addEventListener('click', function () {
                    calendarInputClick( myCalendars[i].nameCalendarId);
                }.bind())
            });

            myCalendars[i].colorForButtonsOnLoad();
            myCalendars[i].calendarButtonClick();
             
            document.addEventListener('click', function (e) {
                if (!document.getElementById(myCalendars[i].nameCalendarId).contains(e.target)) {
                    element = document.querySelector("#" + myCalendars[i].nameCalendarId + " .calendarList");
                    element.classList.remove('calendarActive');
                }
            });
            
        }
       
    }

    function calendarInputClick(nameCalendar) { 
        const calendar = document.querySelector("#" + nameCalendar + " .calendarList");
        calendar.classList.toggle('calendarActive');
    }


}