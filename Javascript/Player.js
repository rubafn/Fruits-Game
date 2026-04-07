const Player = {
    x: 1200, //initial player position at the center 
    y: 750,
    size: 40,
    speed: 4,
    sprite: null,

    update: () => {
         if (Input.keys["ArrowUp"]) {
            Player.y -= Player.speed;
            Player.sprite = AssetLoader.images.playerUp;
        }
        if (Input.keys["ArrowDown"]) {
            Player.y += Player.speed;
            Player.sprite = AssetLoader.images.playerDown;
        }
        if (Input.keys["ArrowLeft"]) {
            Player.x -= Player.speed;
            Player.sprite = AssetLoader.images.playerLeft;
        }
        if (Input.keys["ArrowRight"]) {
            Player.x += Player.speed;
            Player.sprite = AssetLoader.images.playerRight;
        }

        //player inside background
        Player.x = Math.max(0, Math.min(Player.x, Game.bgWidth - Player.size));
        Player.y = Math.max(0, Math.min(Player.y, Game.bgHeight - Player.size));
    },

    draw: (ctx) => {
        if(!Player.sprite) return;
        //draw player at screen center
        const screenX = Game.canvas.width / 2 - Player.size / 2;
        const screenY = Game.canvas.height / 2 - Player.size / 2;
        ctx.drawImage(Player.sprite, screenX, screenY, Player.size, Player.size);
    }
};
