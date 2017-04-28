import IQService = angular.IQService;
import IPromise = angular.IPromise;
/**
 * Created by gerd on 20.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class PageRestService {
    /**
     *
     * @param $http
     * @param API_AUTH_URL
     * @param zmQueryService
     * @param zmTokenService
     * @param $log
     */
    constructor(private $http: angular.IHttpService, private API_AUTH_URL: string, private zmQueryService, private zmTokenService, private $log: angular.ILogService) {

    }

    /**
     *
     * @param project
     * @param page
     * @return {IPromise<IPage>}
     */
    createPage(project: IProject, page: IPage): IPromise<IPage> {
      return this.$http.post(`${this.API_AUTH_URL}/projectpages`, {
        project_id: project.id,
        displayorder: page.displayorder,
        svg_data: page.svg
      })
        .then((response: IQueryResponse) => {
          this.$log.debug('displayorder', page.id, page.displayorder, response.data);
          return response.data['projectpage'];
        });
    }

    /**
     *
     * @param project
     * @param version
     * @returns {IPromise<IPage[]>}
     */
    readPages(project: IProject, version?: number): IPromise<IPage[]> {
      const qp: IQueryParams = this.zmQueryService.buildQueryParams();

      qp.setOrder('displayorder');

      let url: string = `${this.API_AUTH_URL}/projects/${project.id}/projectpages`;
      let method: string = 'get'; // to just read a page
      if (angular.isNumber(version)) {
        url = `${url}/${version}`;
        method = 'put'; // to reactivate a previous version of a page
      }
      return this.$http[method](url, {
        params: qp.params
      })
        .then((response: IQueryResponse) => {
          let pages: IPage[] = response.data['projectpages'];
          this.$log.debug('readPages', response, pages);
          return pages;
        });
    }

    /**
     *
     * @param project
     * @param id
     * @returns {IPromise<IPage>}
     */
    readPage(project: IProject, id: string): IPromise<IPage> {
      return this.$http.get(`${this.API_AUTH_URL}/projectpages/${id}`)
        .then((response: IQueryResponse) => {
          let page: IPage = response.data['projectpages'];
          // this.$log.debug(response, page);
          return page;
        });
    }

    /**
     *
     * @param page
     * @param stable
     * @returns {IPromise<IPage>}
     */
    updatePage(page: IPage, stable: boolean = false): IPromise<IPage> {
      let url: string = `${this.API_AUTH_URL}/projectpages/${page.id}`;
      let body: {content_stable?: string, content_tmp_save?: string, svg_data?: string} = {};
      const content: string = page.json;
      if (stable) {
        url = `${url}/stableSave`;
        body.content_stable = content;
        body.svg_data = page.svg;
      } else {
        url = `${url}/tmpSave`;
        body.content_tmp_save = content;
      }
      return this.$http.post(url, body)
        .then((result) => {
          // this.$log.debug('updatePage', body, result.data['projectpage']);
          return result.data['projectpage'];
        });
    }

    /**
     *
     * @param page
     * @returns {IPromise<IPage>}
     */
    deletePage(page: IPage): IPromise<IPage> {
      return this.$http.delete(`${this.API_AUTH_URL}/projectpages/${page.id}`)
        .then((response: IQueryResponse) => {
          // this.$log.debug(response.data, page.id);
          return page;
        });
    }

    /**
     *
     * @param page
     * @param displayorder
     * @returns {IPromise<TResult>}
     */
    setDisplayOrder(page: IPage, displayorder: number): IPromise<IPage> {
      return this.$http.post(`${this.API_AUTH_URL}/projectpages/${page.id}/displayOrder`, {
        displayorder
      })
        .then((response: IQueryResponse) => {
          // this.$log.debug('displayorder', page.id, displayorder, response.data);
          return response.data['projectpage'];
        });
    }

    /**
     * Sendet das svg der Page zum Restservice /api/me via
     * @param page
     */
    sendSvg2Print(page: IPage): void {
      let token = this.zmTokenService.readToken();
      let obj = {
        'token': token,
        'options': {
          'type:': 'screen',
          'resolution': '96',
          'profile': ''
        },
        'object': page.svg,
      };
      this.$http.post(`${this.API_AUTH_URL}/print`, obj).then(
        () => {
          this.$log.debug('sendSvg2Print :: ok');
        },
        (resp) => {
          this.$log.debug('sendSvg2Print :: nok', resp);
        }
      );
    }
  }

  angular.module('common.services.pagerest', [])
    .service('zmPageRestService', PageRestService);
})();
