const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById('timer');



let timer;
let minutes = 45;
let seconds = 0;

function startTimer() {
    timer = setInterval(() => {
        if (seconds == 0) {
            if (minutes == 0) {
                clearInterval(timer);
                timerDisplay.innerText = "Time for a break!";
                alert('Please take a break');

                return;
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        timerDisplay.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (minutes == 30 && seconds == 0) {
            timerDisplay.classList.add("time-alert");
            timerDisplay.innerText += " (Time for a break soon!)";
        }

    }, 1000);
}
if (startBtn){
    startBtn.addEventListener("click", () => {
        const selectedMood = document.querySelector('input[name="mood"]:checked');

        if (!selectedMood) {
            alert("Please select your mood.");
            return;
        }
        //startBtn.style.display = "none";
        document.querySelectorAll('input[name="mood"]').forEach(radio => radio.disabled = true);
        startTimer();
    });

}

module.exports = {
    startBtn,
    startTimer
};