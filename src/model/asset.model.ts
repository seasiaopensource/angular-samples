import IAssetPrice = zm.common.IAssetPrice;
import IAssetPredicate = zm.common.IAssetPredicate;
/**
 * Created on 24.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class Asset implements IAsset {
    constructor(public id: string,
                public type: number,
                public mime_type: string = 'text/plain',
                public editable: boolean = false,
                public created_at: Date,
                public updated_at: Date,
                public name: string,
                public thumbnail: string,
                public author: string = '',
                public content: zm.common.IAssetContent = {
                  width: 100,
                  height: 100,
                  fillable: true
                },
                public price: number,
                public free: boolean = false,
                public tags: string[] = [],
                public industries: string[] = []) {

      this.free = Boolean(this.free);
    }

  }

  angular.module('common.model.asset', [])
    .value('Asset', Asset);
})();
