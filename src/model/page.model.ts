/**
 * Created on 16.02.16.
 */
(function () {
  'use strict';

  class Page implements IPage {
    constructor(public id: string,
                public displayorder: number,
                public created_at: Date = new Date(),
                public updated_at: Date = new Date(),
                public json: string = '{"objects": [],"background": "#ffffff"}',
                public svg: string = '',
                public thumbnail: string) {
      // TODO do we work with strings or objects?
      this.json = angular.fromJson(json);
    }

    /**
     *
     * @param dimensions
     * @param color
     */
    buildSvg(dimensions: zm.common.IDimensions, color: string = '#ffffff'): void {
      this.svg = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${dimensions.width}" height="${dimensions.height}" style="background-color: ${color}" viewBox="0 0 ${dimensions.width} ${dimensions.height}" xml:space="preserve"><desc>Created with Fabric.js 1.6.3</desc><defs></defs></svg>`;
    }
  }

  angular.module('common.model.page', [])
    .value('zmPage', Page);
})();
