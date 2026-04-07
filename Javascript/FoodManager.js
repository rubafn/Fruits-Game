"use strict";

const FoodManager = {
    foods: [
        { type: "healthy", sprite: "apple" },
        { type: "healthy", sprite: "banana" },
        { type: "unhealthy", sprite: "burger" },
        { type: "unhealthy", sprite: "fries" },
        { type: "healthy", sprite: "milk" },
        { type: "unhealthy", sprite: "soda" }
    ],

    createFood: function (x, y) {
        const choice = this.foods[Math.floor(Math.random() * this.foods.length)];

        return {
            x: x,
            y: y,
            size: 36,
            time: 1200,//20 seconds on screen
            type: choice.type,
            sprite: choice.sprite,

            update: function() {
                this.time--;
            },

            draw: function(ctx, offset) {
                ctx.drawImage(AssetLoader.images[this.sprite],this.x + offset.x,this.y + offset.y, this.size, this.size);
            }
        };
    },

    isHealthy: (item) => {
        return item.type === "healthy";
    }
};
