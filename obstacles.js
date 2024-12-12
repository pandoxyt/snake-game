class Obstacle {
    constructor(gridWidth, gridHeight, numObstacles = 5) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.positions = [];
        this.obstaclesCount = 0;

    }

    addObstacles(count) {
        for (let i = 0; i < count; i++) {
            this.addObstacle();
        }
    }

    removeObstacle() {
        if (this.positions.length > 0) {
            const index = floor(random(this.positions.length));
            this.positions.splice(index, 1);
        }
    }

    clearObstacles() {
        this.positions = [];
    }
    addObstacle() {
        let attempts = 0;
        const maxAttempts = 10;
        while (attempts < maxAttempts) {
            attempts++;
            const shapeType = floor(random(3));
            let startX, startY;
            do {
                startX = floor(random(this.gridWidth));
                startY = floor(random(this.gridHeight));
            } while (startX === 0 && startY === 0);
            const newPositions = this.generateShapePositions(shapeType, startX, startY);

            if (this.isPositionValid(newPositions)) {
                this.positions.push(...newPositions);
                this.obstaclesCount++;
                break;
            }
        }
        if (attempts >= maxAttempts) {
            console.log("Warning: Unable to place more obstacles after several attempts.");
            this.obstaclesCount++;
        }
    }


    generateShapePositions(shapeType, x, y) {
        let shapePositions = [];
        switch (shapeType) {
            case 0:
                const horizontal = random() < 0.5;
                for (let i = 0; i < 3; i++) {
                    shapePositions.push(
                        horizontal ? createVector((x + i) % this.gridWidth, y)
                            : createVector(x, (y + i) % this.gridHeight)
                    );
                }
                break;
            case 1:
                shapePositions.push(createVector(x, y));
                shapePositions.push(createVector((x + 1) % this.gridWidth, y));
                shapePositions.push(createVector((x + 1) % this.gridWidth, (y + 1) % this.gridHeight));
                break;
            case 2:
                shapePositions.push(createVector(x, y));
                shapePositions.push(createVector((x + 1) % this.gridWidth, y));
                shapePositions.push(createVector((x + 2) % this.gridWidth, y));
                shapePositions.push(createVector((x + 1) % this.gridWidth, (y + 1) % this.gridHeight));
                break;
        }
        return shapePositions;
    }

    isPositionValid(newPositions) {
        for (let newPos of newPositions) {
            for (let existingPos of this.positions) {
                let distance = dist(newPos.x, newPos.y, existingPos.x, existingPos.y);
                if (distance < 8) {
                    return false;
                }
            }
        }
        return true;
    }

    show() {
        fill(139, 69, 19);
        for (let position of this.positions) {
            rect(position.x, position.y, 1, 1);
        }
    }

    checkCollision(snake) {
        for (let obstacle of this.positions) {
            if (obstacle.x === snake.body[0].x && obstacle.y === snake.body[0].y) {
                console.log("[Obstacle]: Collision detected");
                return true;
            }
        }
        return false;
    }
}