class Snake {
    constructor(gridWidth = 45, gridHeight = 45) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        this.boostActive = false;
        this.boostDuration = 15000;
        this.boostStartTime = 0;

        this.reset();
    }

    reset() {
        this.body = [
            createVector(0, 0),
            createVector(0, 0),
            createVector(0, 0)
        ];
        this.xdir = 0;
        this.ydir = 0;
        this.score = 0;

        this.boostActive = false;
        this.boostDuration = 15000;
        this.boostStartTime = 0;
    }

    update() {
        const head = this.body[0].copy();
        head.x += this.xdir;
        head.y += this.ydir;

        if (this.isGameOver(head)) {
            if (!this.xdir == 0 || !this.ydir == 0) {
                console.log("[Snake]: update - Game Over");
                return true;
            }
        }

        this.body.unshift(head);
        this.body.pop();

        return false;
    }

    activateBoost() {
        if (this.boostActive != true) {
            this.boostActive = true;
            console.log("[Snake]: activateBoost - Boost Activated");
            this.boostStartTime = millis();
        }
    }

    checkBoostStatus() {
        if (this.boostActive && millis() - this.boostStartTime > this.boostDuration) {
            this.boostActive = false;
            console.log("[Snake]: checkBoostStatus - Boost Ended");
        }
    }

    isGameOver(head) {
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    setDir(x, y) {
        if (this.body.length > 1) {
            if (x !== 0 && this.xdir !== 0) return;
            if (y !== 0 && this.ydir !== 0) return;
        }
        this.xdir = x;
        this.ydir = y;
    }
    grow(len) {
        for (let i = 0; i < len; i++) {
            this.body.push(this.body[this.body.length - 1].copy());
        }
        this.score += 10;
    }

    eat(food) {
        if (this.body[0].x === food.position.x && this.body[0].y === food.position.y) {
            this.grow(food.type);
            console.log("[Snake]: eat -", food.type);
            return true;
        }
        return false;
    }

    show() {
        noStroke();

        fill(50, 150, 50);
        rect(this.body[0].x, this.body[0].y, 1, 1);

        fill(168, 255, 0);
        for (let i = 1; i < this.body.length; i++) {
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }
}