document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const calendarTable = document.getElementById('calendar-table');
    const eventForm = document.getElementById('event-form');
    const eventInput = document.getElementById('event-input');
    const eventSubmit = document.getElementById('event-submit');

    function generateCalendarDays(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        calendarTable.getElementsByTagName('tbody')[0].innerHTML = '';

        let day = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < startingDay) {
                    cell.textContent = '';
                } else if (day > totalDays) {
                    break;
                } else {
                    cell.textContent = day;
                    cell.addEventListener('click', function () {
                        selectDay(cell);
                    });
                    day++;
                }
                row.appendChild(cell);
            }
            calendarTable.getElementsByTagName('tbody')[0].appendChild(row);
        }
    }

    
    function selectDay(cell) {
        const selectedDay = cell.textContent;
        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);

        const event = eventInput.value.trim();
        if (event !== '') {
            const eventText = `${selectedDay}/${selectedMonth + 1}/${selectedYear}: ${event}`;
            const eventItem = document.createElement('p');
            eventItem.textContent = eventText;
            document.body.appendChild(eventItem);
        }

        const selectedCell = calendarTable.querySelector('.selected');
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }

        cell.classList.add('selected');

        console.log(`Selected Date: ${selectedDay}/${selectedMonth + 1}/${selectedYear}`);
    }

    eventSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        const selectedDayCell = calendarTable.querySelector('.selected');
        if (selectedDayCell) {
            selectDay(selectedDayCell);
        }
        eventInput.value = '';
    });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    monthSelect.value = currentMonth.toString();
    yearSelect.value = currentYear.toString();
    generateCalendarDays(currentYear, currentMonth);
});
module.exports = {selectDay};