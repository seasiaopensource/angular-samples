/**
 * Created on 19.03.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class CreateTileDialog {
    public min: number = 100;
    public max: number = 1600;
    public step: number = 1;
    public width: number = 300;
    public height: number = 300;
    public tile: ITile;

    /**
     *
     * @param $mdDialog
     */
    constructor(private $mdDialog: IDialogService) {
      this.tile = {
        width: this.width,
        height: this.height
      };
    }

    /**
     *
     * @param tile
     */
    submit(tile: ITile) {
      this.$mdDialog.hide(tile);
    }
  }

  angular.module('common.dialogs.tiles.createtile', [])
    .controller('zmCreateTileDialog', CreateTileDialog);
})();
