import ITile = zm.common.ITile;
import IWildcard = zm.common.IWildcard;

/**
 * Created on 16.03.16.
 */
(function () {
  'use strict';

  /*
   Hintergründe
   Produktabbildungen
   Bilder
   Elemente
   Logos
   Videos
   Dokumente
   Textbox „Produktbeschreibung“
   Textbox „Preis“
   Textbox „Einklinker“
   */
  enum WildcardType {
    BackgroundImage, ProductImage, Image, Shape, Logo, Video, Document, Description, Price, Text
  }

  enum fabricObj {
    line,
    circle,
    triangle,
    elipse,
    rect,
    polyline,
    polygon,
    group,
    text,
    i_text,
    image,
    path,
    path_group,
    unknown,
  }

  enum AssetType {
    Image, Group, Video, Document, BackgroundColor, BackgroundImage, Shape, Textfield, Logo, Tile, Grid, WildCard, Freehand, None
  }


  /**
   *
   */
  class Tile implements ITile {
    public width: number;
    public height: number;
    public src: string;
    private _assets: zm.common.IAsset[];
    private _wildcards: IWildcard[];

    /**
     *
     * @param width
     * @param height
     * @param assets
     * @param wildcards
     */
    constructor(width: number, height: number, assets: zm.common.IAsset[] = [], wildcards: IWildcard[] = []) {
      this.width = width;
      this.height = height;
      this._assets = assets;
      this._wildcards = wildcards;
    }

    /**
     *
     * @return {zm.common.IAsset[]}
     */
    get assets(): zm.common.IAsset[] {
      return this._assets;
    }

    /**
     *
     * @return {IWildcard[]}
     */
    get wildcards(): IWildcard[] {
      return this._wildcards;
    }

    /**
     *
     * @param asset
     */
    addAsset(asset: zm.common.IAsset): ITile {
      this._assets.push(asset);
      return this;
    }

    /**
     *
     * @param wildcard
     * @return {Tile}
     */
    addWildcard(wildcard: IWildcard): ITile {
      this._wildcards.push(wildcard);
      return this;
    }
  }

  angular.module('common.model.tile', [])
    .value('zmWildcardType', WildcardType)
    .value('zmTile', Tile);

})();
