class Food {
    constructor(obstacles) {
        this.obstacles = obstacles;
        this.respawn();
    }

    respawn() {
        let validPosition = false;

        while (!validPosition) {
            this.position = createVector(
                floor(random(width / resolution)),
                floor(random(height / resolution))
            );
            this.type = floor(random(1, 5));
            validPosition = !this.isOnObstacle(this.position);
        }

        console.log("[Food]: Spawn -", this.type);
    }

    isOnObstacle(position) {
        for (let obstacle of this.obstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
                return true;
            }
        }
        return false;
    }

    show() {
        if (this.type === 1) {
            fill(255, 0, 0);
        } else if (this.type === 2) {
            fill(0, 0, 255);
        } else if (this.type === 3) {
            fill(255, 165, 0);
        } else if (this.type === 4) {
            fill(255, 0, 127);
        }
        rect(this.position.x, this.position.y, 1, 1);
    }
}