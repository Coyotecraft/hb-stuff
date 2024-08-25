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
 * @help -The death State won't automatically set HP to 0
 * -Mind the target scope of MP recovery items for Alive, Dead, or Unconditional. 
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

Game_Party.prototype.reviveBattleMembers = function() {
    for (const actor of this.battleMembers()) {
        if (actor.isDead()) {
            if (actor.hp === 0){actor.setHp(1)} ;
			if (actor.mp === 0){actor.setMp(1)} ;
        }
    }
};

Game_BattlerBase.prototype.die = function() {
    //this._hp = 0;
    this.clearStates();
    this.clearBuffs();
};

Game_BattlerBase.prototype.revive = function() {
    if (this._hp === 0) {this._hp = 1;}
	if (this._mp === 0) {this._mp = 1;}
};

})();