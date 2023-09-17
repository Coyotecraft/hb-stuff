/*
 * --------------------------------------------------
 * Flip Battle Field
 * Copyright (c) 2023 Coyotecraft
 * --------------------------------------------------
 * 
 */

/*:
 * @target MZ
 * @url https://www.arpgmaker.com
 * @plugindesc Moves the battle sprites around. 
 * @author Coyotecraft 
 * @help 
 *
 * @param Flip
 * @desc Move the SV Actors and Enemies to opposite sides. 
 * @type boolean
 * @default false
 *	
 * @help this plugin allows you to flips the Battle Field Sprite layer around. 
 * Damage and State Icons Sprites are fliped (again) to compensate. 
 * 
 * Currently Effekseer Animations are not flipped. 
 * But the old style MV animation sprite are flipped.
 *
 * It's possible sprites added by other pluggins to battle field will also be flipped. 
 */


(() => {
	var pluginName = 'Flip Battle Field';
	var valueFlip = JSON.parse(PluginManager.parameters('Flip Battle Field')['Flip']);

Sprite_Damage.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._duration = 90;
    this._flashColor = [0, 0, 0, 0];
    this._flashDuration = 0;
    this._colorType = 0;
	this.scale.x = valueFlip ? -1 : 1; //coyote
};

Spriteset_Battle.prototype.createBattleField = function() {
    const width = Graphics.boxWidth;
    const height = Graphics.boxHeight;
    const x = (Graphics.width - width) / 2;
    const y = (Graphics.height - height) / 2;
    this._battleField = new Sprite();
    this._battleField.setFrame(0, 0, width, height);
    this._battleField.x = valueFlip ? Graphics.width : x; //coyote
    this._battleField.y = y - this.battleFieldOffsetY();
    this._baseSprite.addChild(this._battleField);
    this._effectsContainer = this._battleField;
	this._battleField.scale.x = valueFlip ? -1 : 1; //coyote
	
};

Sprite_StateOverlay.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
	this.scale.x = valueFlip ? -1 : 1; //coyote
};

})();