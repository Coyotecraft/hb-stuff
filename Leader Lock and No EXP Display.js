(() => {

Window_Status.prototype.drawBlock2 = function() {
    const y = this.block2Y();
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
   // this.drawExpInfo(456, y);
};

BattleManager.displayRewards = function() {
    //this.displayExp();
    this.displayGold();
    this.displayDropItems();
};

Scene_Menu.prototype.onFormationOk = function() {
    const index = this._statusWindow.index();
    const pendingIndex = this._statusWindow.pendingIndex();
	if (index == 0 || pendingIndex ==0){SoundManager.playBuzzer(); this._statusWindow.activate(); return;}; //added
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

})();