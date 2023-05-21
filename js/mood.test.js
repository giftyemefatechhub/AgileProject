
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


test('Timer should start and countdown correctly', () => {
    // Mock the necessary elements
    const display = { textContent: "" };
    jest.useFakeTimers();

    // Call the startTimer function
    startTimer(120, display);

    // Expect the timer to start and countdown correctly
    jest.advanceTimersByTime(3000); // Advance the timers by 3 seconds

    // Expect the display.textContent to have updated correctly
    expect(display.textContent).toBe("01:58");

    jest.advanceTimersByTime(57000); // Advance the timers by 57 seconds

    // Expect the display.textContent to have updated correctly
    expect(display.textContent).toBe("01:01");
});
