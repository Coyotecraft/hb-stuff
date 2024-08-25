/*
 * --------------------------------------------------
 * MP Zero Death
 * Copyright (c) 2024 Coyotecraft
 * --------------------------------------------------
 * 
 */

/*:
 * @target MZ
 * @url https://www.arpgmaker.com
 * @plugindesc 0MP means death
 * @author Coyotecraft 
 */



(() => {

//-----------------------------------------------------------------------------
//
//
//-----------------------------------------------------------------------------
Game_Battler.prototype.refresh = function() {
    Game_BattlerBase.prototype.refresh.call(this);
if (this.hp === 0 || this.mp === 0) {
        this.addState(this.deathStateId());
    } else {
        this.removeState(this.deathStateId());
    }
};

})();