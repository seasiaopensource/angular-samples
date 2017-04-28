import IPageFormat = zm.common.IPageFormat;
/**
 * Created on 08.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class CreateProjectDialog {
    public name: string;
    public format: IPageFormat;
    private medium: number;
    private orientation: number;
    public formats: IPageFormat[];

    /**
     *
     * @param {IDialogService} $mdDialog
     * @param {angular.ILogService} $log
     * @param zmPageFormatService
     * @param zmProjectService
     */
    constructor(private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService, private zmPageFormatService, private zmProjectService) {
      this.zmPageFormatService.readPageFormats()
        .then((formats: IPageFormat[]) => {
          const f: IPageFormat = formats[0];
          this.name = '';
          this.format = f;
          this.medium = f.medium;
          this.orientation = f.orientation;
          this.formats = formats;
        });
    }

    /**
     *
     * @returns {string[]}
     */
    getMediums() {
      return this.zmPageFormatService.getMediums();
    }

    /**
     *
     * @returns {any}
     */
    getProviders() {
      return this.zmPageFormatService.getProviders();
    }

    /**
     *
     */
    getOrientations() {
      return this.zmPageFormatService.getOrientations();
    }

    /**
     *
     * @returns {*[]}
     */
    getUnits() {
      return this.zmPageFormatService.getUnits();
    }

    /**
     *
     * @param medium
     * @param orientation
     */
    onChangeMedium(medium: number, orientation?: number) {
      this.format = this.zmPageFormatService.getFirstFormat(medium, orientation);
    }

    /**
     *
     * @param format
     */
    onChangeFormat(format: IPageFormat) {
      if (this.isFreeFormat(format)) {
        format.unit = this.zmPageFormatService.getDefaultUnit(format.medium);
      }
    }

    /**
     *
     * @param medium
     * @param orientation
     * @param format
     */
    onChangeOrientation(medium: number, orientation: number, format: IPageFormat) {
      this.format = this.zmPageFormatService.getReverseFormat(medium, orientation, format.name);
    }

    /**
     *
     * @param format
     */
    isSocial(format: IPageFormat): boolean {
      return format && this.zmPageFormatService.isSocial(format);
    }

    /**
     *
     * @param format
     */
    hasOrientation(format: IPageFormat): boolean {
      return format && angular.isNumber(format.orientation);
    }

    /**
     *
     * @param format
     * @returns {boolean}
     */
    isFixedFormat(format: IPageFormat): boolean {
      return format && this.zmPageFormatService.isFixedFormat(format);
    }

    /**
     *
     * @param format
     * @return {boolean}
     */
    isFreeFormat(format: IPageFormat): boolean {
      return format && this.zmPageFormatService.isFreeFormat(format);
    }

    /**
     *
     * @param medium
     */
    getMinSize(medium: number): number {
      return this.zmPageFormatService.getMinSize(medium);
    }

    /**
     *
     * @param medium
     */
    getMaxSize(medium: number): number {
      return this.zmPageFormatService.getMaxSize(medium);
    }

    /**
     *
     * @param name
     * @param format
     */
    submit(name: string, format: IPageFormat) {
      this.zmProjectService.createProject(name, format)
        .then((project: IProject) => this.$mdDialog.hide(project));
    }

  }

  angular.module('common.dialogs.createproject', [])
    .controller('zmCreateProjectDialog', CreateProjectDialog);
})();
