import { grid } from "./constants.js";

export default class Timer {
  constructor() {
    this.setTimer();
    this.time = { hours: 0, minutes: 0, seconds: 0 };
  }

  setTimer() {
    grid.addEventListener("click", () => {
      setInterval(() => {
        this.time.seconds++;
        console.log(this.time.seconds);
      }, 1000);
      grid.removeEventListener();
    });
  }

  endTimer() {}
}
