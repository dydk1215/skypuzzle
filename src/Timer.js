import { grid } from "./constants.js";

export default class Timer {
  constructor() {
    this.timer = [0, 0];
    this.running = false;
    this.setTimer();
  }

  setTimer() {
    grid.addEventListener("click", () => {
      if (this.running) return;

      this.intervalId = setInterval(() => {
        this.timer[1]++;

        if (this.timer[1] === 60) {
          this.timer[0]++;
          this.timer[1] = 0;
        }

        this.printTimer(this.timer);
      }, 1000);
      this.running = true;
    });
  }

  printTimer(time) {
    const timerArea = document.querySelector(".timer");
    timerArea.textContent = `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(2, "0")}`;
  }

  endTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
