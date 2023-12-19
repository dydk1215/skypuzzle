export default class Timer {
  constructor(id) {
    this.timer = 0;
    this.running = false;
    this.setTimer(id);
  }

  setTimer() {
    const grid = document.querySelector(".grid");

    grid.addEventListener("click", () => {
      if (this.running) return;

      this.intervalId = setInterval(() => {
        this.timer++;
        this.printTimer();
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

  printTimer() {
    const timerArea = document.querySelector(".timer");
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer < 60 ? this.timer : this.timer - minutes * 60;

    timerArea.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  endTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
