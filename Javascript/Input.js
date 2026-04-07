"use strict";

const Input = {
    keys: {},

    init: ()=> {
        window.addEventListener("keydown", e=>{
            Input.keys[e.key] = true;
        });

        window.addEventListener("keyup", e => {
            Input.keys[e.key] = false;
        });
    }
};
