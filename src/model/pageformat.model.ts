/**
 * Created on 11.02.16.
 */

(function () {
  'use strict';

  enum Medium {
    Print, Web, Social
  }

  enum Provider {
    Twitter, Facebook, 'Google Plus', LinkedIn
  }

  enum Unit {
    mm,
    px,
    // inch
  }

  class PageFormat implements zm.common.IPageFormat {
    id: string;
    medium: Medium;
    provider: Provider;
    label: string;
    width: number;
    height: number;
    unit: Unit;

    constructor() {
        this.id = '';
        this.medium = Medium.Social;
        this.provider =  Provider.LinkedIn;
        this.label =  '';
        this.width =  0;
        this.height = 0;
        this.unit =  Unit.px;

    }
  }

  angular.module('common.model.pageformat', [])
    .value('PageFormat', PageFormat);
})();


