"use strict";

const Game = {
    canvas: null,
    ctx: null,

    bgOffset: { x: 1200, y: 750 },
    bgWidth: 2400,
    bgHeight: 1500,

    foods: [],
    score: 0,
    mistakes: 0,
    started: false,
    ended: false,

    start: () =>{
        Game.canvas = document.getElementById("gameCanvas");
        Game.ctx = Game.canvas.getContext("2d");

        Input.init();

        AssetLoader.loadImage("bg", "assets/Scene Overview.png");
        AssetLoader.loadImage("playerUp", "assets/mh8mzx1vvmda1.gif");
        AssetLoader.loadImage("playerDown", "assets/g61x0rmuvmda1.gif");
        AssetLoader.loadImage("playerLeft", "assets/90a8bpvuvmdaleft.png");
        AssetLoader.loadImage("playerRight", "assets/90a8bpvuvmda1.gif");

        AssetLoader.loadImage("apple", "assets/apple.png");
        AssetLoader.loadImage("banana", "assets/banana.png");
        AssetLoader.loadImage("milk", "assets/milk.png");
        AssetLoader.loadImage("burger", "assets/burger.png");
        AssetLoader.loadImage("fries", "assets/fries.png");
        AssetLoader.loadImage("soda", "assets/cola.png");

        AssetLoader.loadSound("good", "assets/515736__lilmati__retro-coin-06.wav");
        AssetLoader.loadSound("bad", "assets/wrong.wav");
        
        Player.sprite = AssetLoader.images.playerRight;
        Game.bgOffset.x = (Game.canvas.width - Game.bgWidth) / 2;
        Game.bgOffset.y = (Game.canvas.height - Game.bgHeight) / 2;

        requestAnimationFrame(Game.loop);
    },

    createFood: () => {
        const x = 100 + Math.random() * (Game.bgWidth - 100);
        const y = 100 + Math.random() * (Game.bgHeight - 100);

        Game.foods.push(FoodManager.createFood(x, y));
    },


    update: () =>{
        if (!Game.started || Game.ended) return;

        Player.update();

        //camera moves so player stays near center
        Game.bgOffset.x = Game.canvas.width / 2 - Player.x;
        Game.bgOffset.y = Game.canvas.height / 2 - Player.y;

        //background edges are not visible outside
        Game.bgOffset.x = Math.min(0, Math.max(Game.bgOffset.x, Game.canvas.width - Game.bgWidth));
        Game.bgOffset.y = Math.min(0, Math.max(Game.bgOffset.y, Game.canvas.height - Game.bgHeight));


        for (let i = Game.foods.length - 1; i >= 0; i--) {
            const food = Game.foods[i];

            food.update();

            if (food.time <= 0) {
                Game.foods.splice(i, 1);
                continue;
            }

            if (Game.checkCollision({ x: Player.x, y: Player.y, size: Player.size }, food)){
                if (FoodManager.isHealthy(food)) {
                    Game.score += 10;
                    Player.speed = 4;
                    AssetLoader.sounds.good.play();
                } else {
                    Game.score -= 5;
                    Game.mistakes++;
                    Player.speed = 2;
                    AssetLoader.sounds.bad.play();
                }
                Game.foods.splice(i, 1);
            }
        }

        if (Math.random() < 0.01) Game.createFood();
        if (Game.mistakes >= 5) Game.ended = true;
    },
    checkCollision:(a, b) => {
        return (
            a.x < b.x + b.size &&//here i check if objects are overlapping in the sides 
            a.x + a.size > b.x &&
            a.y < b.y + b.size &&
            a.y + a.size > b.y
        );
    },

    drawUI:() =>{
        Game.ctx.fillStyle = "white";
        Game.ctx.font = "18px Arial";
        Game.ctx.fillText("Collect HEALTHY foods!", 20, 30);
        Game.ctx.fillText("Score: " + Game.score, 20, 55);
        Game.ctx.fillText("Mistakes: " + Game.mistakes + "/5", 20, 80);
    },

    draw: () =>{
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

        Game.ctx.drawImage(
            AssetLoader.images.bg,
            Game.bgOffset.x,
            Game.bgOffset.y,
            Game.bgWidth,
            Game.bgHeight
        );

        Game.drawUI();

        if (!Game.started) {
            Game.ctx.fillText("Use Arrow Keys to Move", 260, 230);
            Game.ctx.fillText("Collect ONLY Healthy Food within time", 240, 260);
            Game.ctx.fillText("5 mistakes allowed, 1 mistake = slow speed", 220, 290);
            return;
        }

        if (Game.ended) {
            Game.ctx.fillStyle = "rgba(0,0,0,0.7)";
            Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
            Game.ctx.fillStyle = "white";
            Game.ctx.font = "24px Arial";
            Game.ctx.fillText("Game Over", 320, 230);
            Game.ctx.fillText("Final Score: " + Game.score, 290, 270);
            return;
        }

        Player.draw(Game.ctx);

        for (let i = 0; i < Game.foods.length; i++) {
            Game.foods[i].draw(Game.ctx, Game.bgOffset);
        }
    },

    loop:() =>{
        Game.update();
        Game.draw();
        requestAnimationFrame(Game.loop);
    }
};

document.addEventListener("keydown", e =>{
    Game.started = true;
});

document.addEventListener("DOMContentLoaded", e => {
    Game.start();
});
