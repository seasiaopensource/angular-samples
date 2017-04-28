import IPromise = angular.IPromise;
/**
 * Created by gerd on 16.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class PageService {
    private _pages: zm.common.IPage[];

    /**
     *
     * @param $q
     * @param zmPageRestService
     * @param zmPageFormatService
     * @param zmPage
     * @param faker
     * @param $log
     */
    constructor(private $q: IQService, private zmPageRestService, private zmPageFormatService, private zmPage, private faker: Faker.FakerStatic, private $log: angular.ILogService) {
      this.init();
    }

    /**
     *
     * @param project
     * @param after
     * @returns {IPromise<IPage>}
     */
    addPage(project: zm.common.IProject, after?: zm.common.IPage): IPromise<zm.common.IPage> {
      let page: zm.common.IPage = this.buildPage(project.format);
      page.displayorder = after.displayorder + 1;

      return this.zmPageRestService.createPage(project, page)
        .then((page: IPage) => this.toPage(page))
        .then((page: IPage) => {
          page.buildSvg(this.zmPageFormatService.getThumbnailSize(project.format));
          this.insertPage(page, after);
          this.updateDisplayOrder();
          project.edited = true;
          return page;
          // return this.zmPageRestService.setDisplayOrder(page, page.displayorder)
          //   .then(() => page);
        });
    }

    /**
     *
     * @param project
     * @param after
     * @returns {IPromise<IPage>}
     */
    duplicatePage(project: zm.common.IProject, after: zm.common.IPage): IPromise<zm.common.IPage> {
      let clone: zm.common.IPage = angular.copy(after);
      // clone.id = this.faker.random.uuid();
      clone.displayorder = after.displayorder + 1;

      return this.zmPageRestService.createPage(project, clone)
        .then((page: IPage) => this.toPage(page))
        .then((page: IPage) => {
          page.json = clone.json;
          page.svg = clone.svg;
          this.insertPage(page, after);
          this.updateDisplayOrder();
          project.edited = true;
          return page;
        });
    }

    /**
     *
     * @param project
     * @param version
     * @returns {IPromise<zm.common.IPage[]>}
     */
    readPages(project: zm.common.IProject, version?: number): IPromise<zm.common.IPage[]> {
      return this.zmPageRestService.readPages(project, version)
        .then((pages: zm.common.IPage[]) => {
          return pages.map((page: zm.common.IPage) => this.toPage(page));
        })
        .then((pages: IPage[]) => this._pages = pages);
    }

    /**
     *
     * @param project
     * @param id
     * @returns {IPromise<IPage>}
     */
    readPage(project: zm.common.IProject, id: string): IPromise<zm.common.IPage> {
      return this.zmPageRestService.readPage(project, id)
        .then((page: zm.common.IPage) => this.toPage(page));
    }

    /**
     *
     * @param pages
     * @param stable
     * @returns {IPromise<any>|IPromise<zm.common.IPage[]>|IPromise<{}>|IPromise<T>}
     */
    updatePages(pages: IPage[], stable?: boolean): IPromise<zm.common.IPage[]> {
      const promises = pages.map((page: IPage) => this.updatePage(page, stable));
      // this.$log.debug(promises);
      return this.$q.all(promises);
    }

    /**
     *
     * @param page
     * @param stable
     * @returns {IPromise<IPage>}
     */
    updatePage(page: zm.common.IPage, stable?: boolean): IPromise<zm.common.IPage> {
      return this.zmPageRestService.updatePage(page, stable)
        .then((result: IPage) => {
          this.$log.debug('updatePage', result.id, result.displayorder);
          return result;
        })
        .then((result: IPage) => this.toPage(result));
    }

    /**
     *
     * @param project
     * @param page
     * @returns {IPromise<zm.common.IPage>}
     */
    deletePage(project: zm.common.IProject, page: zm.common.IPage): IPromise<zm.common.IPage> {
      return this.zmPageRestService.deletePage(page)
        .then((result: IPage) => {
          project.edited = true;
          let next: zm.common.IPage;
          let index: number;
          index = this._pages.indexOf(page);
          this._pages.splice(index, 1);
          if (index === this._pages.length) {
            index -= 1;
          }
          next = this._pages[index];
          return next;
        });
    }

    /**
     *
     * @param page
     * @param displayorder
     * @returns {IPromise<IPage>}
     */
    setDisplayOrder(page: IPage, displayorder: number): IPromise<IPage> {
      return this.zmPageRestService.setDisplayOrder(page, displayorder)
        .then((result: IPage) => {
          const page2: IPage = angular.merge(page, result);
          this._pages.splice(displayorder - 1, 0, page2);
          this.updateDisplayOrder();
          return page2;
        });
    }

    /**
     *
     */
    private init() {
      this._pages = [];
    }

    /**
     *
     * @param obj
     * @returns {any}
     */
    private toPage(obj: IPage): IPage {
      let page: IPage = new this.zmPage(obj.id, obj.displayorder, obj.created_at, obj.updated_at, obj.content_stable || void 0, obj.svg, obj.thumbURL);
      // this.$log.debug(page);
      return page;
    }

    /**
     *
     * @return {zm.common.IPage}
     */
    private buildPage(format: zm.common.IPageFormat): zm.common.IPage {
      let dimensions: {width: number, height: number} = this.zmPageFormatService.getThumbnailSize(format);
      let page: zm.common.IPage = new this.zmPage();

      page.buildSvg(dimensions);

      return page;
    }

    /**
     *
     * @param page
     * @param [after]
     */
    private insertPage(page: zm.common.IPage, after?: zm.common.IPage): number {
      let index: number = this._pages.indexOf(after) + 1;
      this._pages.splice(index, 0, page);
      return index + 1;
    }

    /**
     *
     */
    private updateDisplayOrder(): void {
      this._pages.forEach((page: IPage, index: number) => page.displayorder = index + 1);
    }

  }

  angular.module('common.services.page', [])
    .service('zmPageService', PageService);
})();
