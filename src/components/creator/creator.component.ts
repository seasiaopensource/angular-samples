import ISidenavService = angular.material.ISidenavService;
import ISidenavObject = angular.material.ISidenavObject;
/**
 * Created on 02.02.16.
 */
interface ICreator {
  performUndo: () => void;
  performRedo: () => void;
  toggleRubberband: () => void;
  toggleCropmarks: () => void;
  selectPage: (page: zm.common.IPage) => void;
  addPage: () => void;
  saveSvgFromPage: (page: zm.common.IPage) => void;
  duplicatePage: (page: zm.common.IPage) => void;
  deletePage: (page: zm.common.IPage) => void;
  selectProject: (project: IProject) => void;
  toggleProjectbar: () => IPromise<void>;
  saveProject: () => IPromise<void>;
  saveAsProject: () => IPromise<void>;
  showProjectHistory: () => void;
  movePage: (page: zm.common.IPage, index: number) => angular.IPromise<zm.common.IPage>;
}

(function () {
  'use strict';

  /**
   *
   */
  class Creator implements ICreator {
    project: IProject;
    pages: zm.common.IPage[];
    page: zm.common.IPage;
    dimensions: zm.common.IDimensions;
    zoom: number;
    history: IHistory<any>;
    bottombar: IBottombar;

    private _temp$; // Observable
    private _page$; // Observable
    private _emitter;

    /**
     *
     * @param $scope
     * @param $mdSidenav
     * @param $timeout
     * @param zmPageService
     * @param zmPageFormatService
     * @param zmCreatorService
     * @param zmToolbarService
     * @param zmEditorService
     * @param zmHistoryService
     * @param Rx
     * @param zmRxService
     * @param zmStageVarServiceTS
     * @param EventEmitter2
     * @param zmDialogService
     * @param $q
     * @param $log
     */
    constructor(private $scope,
                private $mdSidenav: ISidenavService,
                private $timeout: angular.ITimeoutService,
                private zmPageService, private zmPageFormatService,
                private zmCreatorService, private zmToolbarService,
                private zmEditorService,
                private zmHistoryService,
                private Rx,
                private zmRxService,
                private zmStageVarServiceTS,
                private EventEmitter2,
                private zmDialogService,
                private $q: angular.IQService,
                private $log: ILogService) {
      this.zoom = 100;
      this._emitter = new this.EventEmitter2();
      this._page$ = this.Rx.Observable.fromEvent(this._emitter, 'page.select');
    }

    /**
     *
     */
    $onInit() {
      this.$timeout(() => {
        this.selectProject(this.project);
      });
    }

    /**
     *
     */
    $onDestroy() {
      this.zmRxService.removeSubscriptions(this);
      this.zmRxService.removeSubscriptions(this.page);
      this.zmHistoryService.deleteHistory(this.project.id);
      this.$log.debug('zmCreateCreator destroyed');
    }

    /**
     *
     * @param asset
     */
    selectAsset(asset: zm.common.IAsset): void {
      this.$log.debug(asset);
    }

    /**
     *
     */
    performUndo() {
      const json: string = this.history.performUndo().get('json');
      this.page.json = json;
      this.$log.debug(json.length);
      this.showPageOnStage(this.page);
    }

    /**
     *
     */
    performRedo() {
      const json: string = this.history.performRedo().get('json');
      this.page.json = json;
      this.$log.debug(json.length);
      this.showPageOnStage(this.page);
    }

    /**
     *
     */
    toggleRubberband() {
      let page = this.zmStageVarServiceTS.getActiveProjectPage();

      if (page) {
        let page_setup_scr = page.konfig.page_setup_scr;
        page_setup_scr.pageRubber = !page_setup_scr.pageRubber;
      }
    }

    /**
     *
     */
    toggleCropmarks() {
      let page = this.zmStageVarServiceTS.getActiveProjectPage();

      if (page) {
        let page_setup_scr = page.konfig.page_setup_scr;
        let sheet_setup = page.konfig.sheet_setup;
        page_setup_scr.pageGrid = !page_setup_scr.pageGrid;
        page_setup_scr.pageCut = !page_setup_scr.pageCut;
        sheet_setup.lineal_visible = !sheet_setup.lineal_visible;
      }
    }

    /**
     *
     * @param page
     */
    selectPage(page: zm.common.IPage) {
      this.addPageToStage(page);
      this.showPageOnStage(page);
      this.zmToolbarService.hideToolbars();
      this.page = page;

      // TODO move to separate method / service
      this._emitter.emit('page.select');

      this.setupTempSave(page, 5000);
    }

    /**
     *
     */
    addPage(): void {
      this.zmPageService.addPage(this.project, this.page)
        .then((result: zm.common.IPage) => this.selectPage(result));
    }

    /**
     *
     * @param page
     */
    duplicatePage(page: zm.common.IPage) {
      if (!page.svg) {
        // we need to manually create the svg if not yet existent
        this.$scope.$broadcast('zmSheetSvgSave', page.id);
      }
      this.zmPageService.duplicatePage(this.project, page)
        .then((result: zm.common.IPage) => this.selectPage(result));
    }

    /**
     *
     * @param page
     */
    deletePage(page: zm.common.IPage) {
      this.zmPageService.deletePage(this.project, page)
        .then((result: zm.common.IPage) => this.selectPage(result));
    }

    /**
     *
     * @param page
     * @param index
     * @returns {IPromise<T>}
     */
    movePage(page: zm.common.IPage, index: number): angular.IPromise<zm.common.IPage> {
        return this.zmPageService.setDisplayOrder(page, index + 1)
          .then((result: IPage) => {
            return result;
          });
    }

    /**
     *
     * @param project
     * @param version
     */
    selectProject(project: IProject, version?: number): void {
      this.$mdSidenav('projectbar').close();
      this.zmPageService.readPages(project, version)
        .then((pages: zm.common.IPage[]) => {
          this.project = project;
          this.pages = pages;
          this.page = this.pages[0];
          this.dimensions = this.zmPageFormatService.getThumbnailSize(this.project.format);

          this.$timeout(() => {
            // this.pages.forEach((page: zm.common.IPage) => {
            //   this.addPageToStage(page);
            // });
            this.selectPage(this.page);

            // TODO debugging
            this.zmDialogService.showAlert('selectProject', `Loaded "${project.name}" in version "${version}" with "${pages.length}" pages.`);
          }, 0);
          // the currently selected project and page
          return {project: this.project, page: this.page};
        })
        .then((result) => {
          this.zmRxService.removeSubscriptions(this);
          // TODO move to separate methods
          this.setupPageHistory(result.project, result.page);
        });
    }

    /**
     *
     */
    toggleProjectbar(): IPromise<void> {
      return this.$mdSidenav('projectbar').toggle();
    }

    /**
     *
     */
    saveProject(): IPromise<void> {
      return this.zmCreatorService.saveProject(this.project, this.pages)
        .then(result => {
          this.project = result;
          this.$log.debug('saveProject', this.project);
        });
    }

    /**
     *
     */
    saveAsProject(): IPromise<void> {
      return this.zmCreatorService.saveAsProject(this.project)
        .then(result => this.$log.debug(result));
    }

    /**
     *
     */
    showProjectHistory(): void {
      const doShowProjectHistory = () => {
        this.zmCreatorService.showProjectHistory(this.project)
          .then((result: zm.common.IProjectHistory) => this.selectProject(this.project, result.version));
      };
      if (this.project.saved === false) {
        this.zmDialogService.showConfirm('Confirm loading', 'You have unsaved changes. Are you sure you want to load the history of the current project?')
          .then(() => {
            doShowProjectHistory();
          });
      } else {
        doShowProjectHistory();
      }
    }

    /**
     *
     * @returns {IPromise<TResult>}
     */
    savePage(page: IPage): IPromise<IPage> {
      return this.zmCreatorService.savePage(page);
    }

    /**
     *
     * @param page
     */
    private addPageToStage(page: zm.common.IPage): void {
      this.$scope.$broadcast('zmStageEventProjectAddPage', page);
    }

    /**
     *
     * @param page
     * @param position
     */
    private showPageOnStage(page: zm.common.IPage, position: number = 1): void {
      this.$scope.$broadcast('zmStageEventProjectShowPage', page, position);
    }

    /**
     * sichert das Svg im aktuell angezeigten Context in das item svg der Page
     * @param page
     */
    saveSvgFromPage(page: zm.common.IPage) {
      this.$scope.$broadcast('zmSheetSvgSave', page.id);
    }

    /**
     *
     * @param page
     * @param delay
     */
    private setupTempSave(page: IPage, delay: number = 5000): void {
      const _event$ = this.Rx.Observable.from(this.zmEditorService.onChangePageContent());

      const subscription = _event$
        .debounceTime(delay)
        .takeUntil(this._page$)
        .subscribe((result: any) => {
          // this.$log.debug(result);
          this.savePage(page)
            .then((page: IPage) => {
              this.$log.debug('temp save', page.id, page.updated_at);
            });
        });
      this.zmRxService.addSubscription(page, subscription);
    }

    /**
     * Sets up the history of page changes
     */
    private setupPageHistory(project: IProject, page: IPage): void {
      this.history = this.zmHistoryService.createHistory(Immutable.Map({json: page.json}), project.id);
      const _event$ = this.zmEditorService.onChangePageContent();
      const subscription = _event$
        .debounceTime(1000)
        .subscribe(() => {
          this.$timeout(() => {
            this.$scope.$broadcast('zmSheetJSONSave', this.page.id);
            this.history.performOperation((data) => {
              return data.set('json', this.page.json);
            });
            this.$log.debug('setupPageHistory', this.page.svg.length, this.page.json.length, this.history.length);
          });
        });
      this.zmRxService.addSubscription(this, subscription);
    }

  }

  angular.module('create.creator.components.creator', [])
    .controller('zmCreatorController', Creator)
    .component('zmCreateCreator', {
      templateUrl: 'app/main/create/creator/components/creator.html',
      controller: 'zmCreatorController as vm',
      bindings: {
        project: '='
      }
    });

})();
