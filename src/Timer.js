export default class Timer {
  constructor(id) {
    this.timer = [0, 0];
    this.running = false;
    this.setTimer(id);
  }

  setTimer() {
    const grid = document.querySelector(".grid");

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

      const backButton = document
        .querySelector(".board-menu")
        .querySelector("button");
      backButton.onclick = () => {
        this.endTimer();
        const menuDiv = document.querySelector(".menu");
        menuDiv.classList.toggle("invisible");

        const board = document.querySelector(".board");
        board.innerHTML = "";
        board.classList.toggle("invisible");
      };
    });
  }

  printTimer(time) {
    const timerArea = document.querySelector(".timer");
    timerArea.textContent = `${String(time[0]).padStart(2, "0")}:${String(
      time[1]
    ).padStart(2, "0")}`;
  }

  endTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
