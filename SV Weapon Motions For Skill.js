/*
 * --------------------------------------------------
 * SV Weapon Motions For Skill
 * Copyright (c) 2024 Coyotecraft
 * --------------------------------------------------
 * 
 */

/*:
 * @target MZ
 * @url https://www.arpgmaker.com
 * @plugindesc Use weapon attack motions for Skills. 
 * @author Coyotecraft 
 * @help 
 * This plugin rewrites the performAction() function in rmmz_objects.js
 * Add <useWeapon> to a skill's notebox to have the SV Actor perform an Attack motion with their weapon 
 */



(() => {
Game_Actor.prototype.performAction = function(action) {
    Game_Battler.prototype.performAction.call(this, action);
    if (action.isAttack()) {
        this.performAttack();
    } else if (action.isGuard()) {
        this.requestMotion("guard");
    } else if (action.isMagicSkill()) {
        //this.requestMotion("spell");
		$dataSkills[action._item._itemId].meta.hasOwnProperty('useWeapon') ? this.performAttack() : this.requestMotion("spell");
    } else if (action.isSkill()) {
        //this.requestMotion("skill");
		$dataSkills[action._item._itemId].meta.hasOwnProperty('useWeapon')? this.performAttack() : this.requestMotion("skill");
    } else if (action.isItem()) {
        this.requestMotion("item");
    }
};


})();