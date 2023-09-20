/*
 * --------------------------------------------------
 * Front-view Class Sprite
 * Copyright (c) 2023 Coyotecraft
 * --------------------------------------------------
 * 
 */

/*:
 * @target MZ
 * @url https://www.arpgmaker.com
 * @plugindesc Changes the Front View Actor sprite based on Classes. 
 * @author Coyotecraft 
 * @help 
 *
 * @param X
 * @desc Adjust the Actor FV sprite's horizontal placement 
 * @type number
 * @default 0
 *
 * @param Y
 * @desc Adjust the Actor FV sprite's vertical placement 
 * @type number
 * @default -80
 *	
 * @help This is add-on for SuperFrontViewMZ.js
 * Made for RpgMakerWeb member, Benku.
 * Type <battler:filename> in the Class notebox to change the Actor's 
 * front-view Sprite from a faceset to an image in the picture folder. 
 * The filename does not need to be in quotes. 
 */


(() => {
	var pluginName = 'Front-view Class Sprite';
	var valueX = JSON.parse(PluginManager.parameters('Front-view Class Sprite')['X']);
	var valueY = JSON.parse(PluginManager.parameters('Front-view Class Sprite')['Y']);
	
	
	//フロントビュー時に顔画像をサイドビュー画像として読み込む。
	Sprite_ActorFV.prototype.updateBitmap = function() {
		Sprite_Battler.prototype.updateBitmap.call(this);
		const name = this._actor.faceName();
		const index = this._actor.faceIndex();
		if (this._battlerName !== name || this._faceIndex !== index) {
				this._battlerName = name;
				this._faceIndex = index;
			if (this._actor && $dataClasses[this._actor._classId].meta.battler){ // mod
				this._mainSprite.bitmap =  ImageManager.loadPicture($dataClasses[this._actor._classId].meta.battler);
			}else{
				this._mainSprite.bitmap = ImageManager.loadFace(name); //original
				const rect = this._faceRect;
				this.setFaceFrame(rect.width, rect.height);
			}
		};
	};
	
		Sprite_ActorFV.prototype.updateFaceFrame = function() {
		const rect = this._faceRect;
		const width = rect.width;
		const height = rect.height;
		const sw = rect.width;
		const sh = rect.height;
		const sx = rect.x;
		const sy = rect.y;
		if (this._actor && $dataClasses[this._actor._classId].meta.battler){ //mod
			this._mainSprite.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
			this.setFrame(valueX, valueY, sw, sh); //plugin parameters, X & Y
		}else{
			this._mainSprite.setFrame(sx, sy, sw, sh);	//original
			this.setFrame(0, 0, sw, sh);
		};
		
	};

})();