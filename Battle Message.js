/*
 * --------------------------------------------------
 * Battle Message Box
 * Copyright (c) 2023 Coyotecraft
 * --------------------------------------------------
 * 
 */

/*:
 * @target MZ
 * @url https://www.arpgmaker.com
 * @plugindesc Displays messages in battle as 1 line at top of screen. 
 * @author Coyotecraft
 * @help 
 * Sets the default window position to top of the screen. 
 * Changes the Message Window Height (In Battle Only)
 * Displays only 1 line of text per text box. (In Battle Only)
 *
 * @param windowHeight
 * @desc Battle Window Size
 * @type number
 * @default 60
 *
 */


(() => {
	var pluginName = 'Battle Message';

    var windowHeight = Number(PluginManager.parameters(pluginName)['windowHeight']);
		
Game_Message.prototype.clear = function() {
    this._texts = [];
    this._choices = [];
    this._speakerName = "";
    this._faceName = "";
    this._faceIndex = 0;
    this._background = 0;
    this._positionType = 0; // originally 2
    this._choiceDefaultType = 0;
    this._choiceCancelType = 0;
    this._choiceBackground = 0;
    this._choicePositionType = 2;
    this._numInputVariableId = 0;
    this._numInputMaxDigits = 0;
    this._itemChoiceVariableId = 0;
    this._itemChoiceItypeId = 0;
    this._scrollMode = false;
    this._scrollSpeed = 2;
    this._scrollNoFast = false;
    this._choiceCallback = null;
};

Window_Message.prototype.startMessage = function() {
    const text = $gameMessage.allText();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
	if ($gameParty.inBattle()){this.height = windowHeight}; // added
    this.open();
    this._nameBoxWindow.start();
};

Window_Message.prototype.needsNewPage = function(textState) {
	if ($gameParty.inBattle()){
    return (
        !this.isEndOfText(textState) &&
       // textState.y + textState.height > this.contents.height
		textState.y + textState.height > textState.height //coyote: in line per box
    );
	}else{
		return (
        !this.isEndOfText(textState) &&
        textState.y + textState.height > this.contents.height
	);
	};
};

})();