class TowersOfHanoi {
    constructor(discs, towerEls, solveBtn, restartBtn) {
        this.discs = discs; // number of discs
        this.towerEls = towerEls; // array of all elements with class 'tower'
        this.solveBtn = solveBtn;
        this.restartBtn = restartBtn;

        this.bindFunctions(); // create bound versions of 2 methods
        this.initHanoi(); // initialization of various Tower of Hanoi aspects
    }

    bindFunctions() {
        this.handleSolveFunc = this.handleSolve.bind(this);
        this.initHanoiFunc = this.initHanoi.bind(this);
    }

    initHanoi() {
        this.initButtons();
        this.initTowers();
        this.drawTowers();

        this.displayMessage(
            "<br>Press on Start Button"
        );
    }

    initButtons() {
        // this.solveBtn.classList.add("clickable");
        this.solveBtn.addEventListener("click", this.handleSolveFunc);

        // this.restartBtn.classList.add("clickable");
        this.restartBtn.addEventListener("click", this.initHanoiFunc);
    }

    initTowers() {
        this.towers = [[], [], []];

        for (let i = this.discs; i > 0; i--) {
            this.towers[0].push({ id: i });
        }
    }

    drawTowers() {
        this.towerEls.forEach((towerEl, index) => {
            while (towerEl.lastChild) {
                towerEl.removeChild(towerEl.lastChild);
            }

            this.towers[index].map((disc) => {
                let li = document.createElement("LI");
                li.id = `disc-${disc.id}`;
                li.textContent = disc.id;
                li.style.color = "white";

                towerEl.appendChild(li);
            });
        });
    }

    displayMessage(message) {
        const messageBox = document.querySelector("#message");
        messageBox.innerHTML = message;
    }

    async handleSolve() {
        this.voidButtons();

        this.displayMessage("Solving");

        await this.solve(this.discs, 0, 1, 2);

        this.Complete("Successfully solved");
    }

    voidButtons() {
        this.solveBtn.classList.remove("clickable");
        this.solveBtn.removeEventListener("click", this.handleSolveFunc);
        this.restartBtn.classList.remove("clickable");
        this.restartBtn.removeEventListener("click", this.initHanoiFunc);
    }

    async solve(t, a, b, c) {
        if (t === 1) {
            await this.animateMovingDiscs(a, c, 1000);
        } else {
            await this.solve(t - 1, a, c, b);
            await this.solve(1, a, b, c);
            await this.solve(t - 1, b, a, c);
        }
    }

    async animateMovingDiscs(fromIdx, toIdx, delay) {
        const promise = new Promise(resolve => setTimeout(resolve, delay));
        await promise;

        this.moveDisc(fromIdx, toIdx);
        this.drawTowers();
    }

    moveDisc(fromIdx, toIdx) {
        this.towers[toIdx].push(this.towers[fromIdx].pop());
    }

    Complete(withMessage) {
        this.voidButtons();
        this.displayMessage(withMessage);
        this.initButtons();
    }
}

const towers = document.querySelectorAll(".tower");
const solveBtn = document.querySelector(".solve");
const restartBtn = document.querySelector(".restart");

let flag = 1;

function enter() {
    if (flag == 1) {
        const userInput = prompt("Enter number of rings:");
        let parsedInput = parseInt(userInput);

        if ((!isNaN(parsedInput)) && (parsedInput > 0)) {
            flag = 0;

            const towerC = document.getElementById("towers");
            if (parsedInput > 9) {
                towerC.style.height = `${(parsedInput * 20) + 10}px`
            }

            const toh = new TowersOfHanoi(parsedInput, towers, solveBtn, restartBtn);
        } else {
            alert("Invalid input. Please enter a valid number greater than zero.");
        }

        let cssRules = '';
        for (let i = 1; i <= parsedInput; i++) {
            if (parsedInput > 20) {
                cssRules += `#towers li[id=disc-${i}] { 
  width: 120px;
  text-align:center;
  }\n`;
            } else {
                cssRules += `#towers li[id=disc-${i}] { 
  width: ${60 + i * 10}px;
  text-align:center;
  }\n`;
            }
        }

        let style = document.createElement('style');
        style.appendChild(document.createTextNode(cssRules));
        document.head.appendChild(style);

    } else {
        alert("Tower of Hanoi visualization is already running");
    }
}
