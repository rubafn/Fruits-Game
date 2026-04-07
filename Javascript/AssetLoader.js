"use strict";

const AssetLoader = {
    images: {},
    sounds: {},

    loadImage: (name, src) =>{
        const img = new Image();
        img.src = src;
        AssetLoader.images[name] = img;
    },

    loadSound: (name, src) =>{
        const snd = new Audio(src);
        AssetLoader.sounds[name] = snd;
    }
};
