import IProject = zm.common.IProject;
import IUserInfo = zm.common.IUserInfo;
import IQueryResponse = zm.common.IQueryResponse;
/**
 * Created by gerd on 19.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class ProjectRestService {

    /**
     *
     * @param $q
     * @param $http
     * @param API_AUTH_URL
     * @param zmQueryService
     * @param $log
     */
    constructor(private $q: angular.IQService, private $http: angular.IHttpService, private API_AUTH_URL: string, private zmQueryService, private $log: angular.ILogService) {
    }

    /**
     *
     * @param name
     * @param pageformat_id
     * @returns {IPromise<TResult>}
     */
    createProject(name: string, pageformat_id: string): angular.IPromise<IProject> {
      return this.$http.post(`${this.API_AUTH_URL}/projects`, {
        name,
        pageformat_id
      })
        .then((response: angular.IHttpPromiseCallbackArg) => {
          this.$log.debug(response);
          return response.data['project'];
        });
    }

    /**
     *
     * @return {angular.IPromise<zm.common.IProject[]>}
     */
    readProjects(qp: IQueryParams): angular.IPromise<zm.common.IProject[]> {
      qp.addInclude('user');

      return this.$http.get(`${this.API_AUTH_URL}/projects`, {
        params: qp.params
      })
        .then((response: angular.IHttpPromiseCallbackArg) => {
          // this.$log.debug(response);
          return response.data['projects'];
        });
    }

    /**
     *
     * @param id
     * @return {angular.IPromise<zm.common.IProject>}
     */
    readProject(id: string): angular.IPromise<zm.common.IProject> {
      return this.$http.get(`${this.API_AUTH_URL}/projects/${id}`, {
        params: this.getQueryParams()
      })
        .then((response: IQueryResponse) => {
          let project: IProject = response.data['project'];
          // this.$log.debug(project);
          return project;
        })
        .catch((error) => {
          this.$log.warn(error);
        });
    }

    /**
     *
     * @param project
     * @param stable
     * @param pages
     * @return {angular.IPromise<zm.common.IProject>}
     */
    updateProject(project: IProject, stable?: boolean, pages: IPage[] = []): angular.IPromise<zm.common.IProject> {
      let url: string = `${this.API_AUTH_URL}/projects/${project.id}`;
      let body: {projectpages?: any[]} = {};

      if (stable) {
        url = `${url}/stableSaveAll`;
        body.projectpages = pages.map((page: IPage) => {
          return {
            id: page.id,
            content_stable: page.json,
            displayorder: page.displayorder,
            svg_data: page.svg || null
          };
        });
      } else {
        body = project;
      }
      return this.$http.put(url, body)
        .then((response: IQueryResponse) => {
          this.$log.debug(response.data['project']);
          // TODO handle problems with missing included "pageformat" and "user"
          return this.readProject(project.id);
        })
        .catch((error) => {
          this.$log.warn(error);
        });
    }

    /**
     *
     * @param project
     * @return {IPromise<string>}
     */
    duplicateProject(project: IProject): angular.IPromise<string> {
      return this.$http.post(`${this.API_AUTH_URL}/projects/${project.id}`, project)
        .then((response: IQueryResponse) => {
          let project: IProject = response.data['project'];
          this.$log.debug(project);
          return project.id;
        })
        .catch((error) => {
          this.$log.warn(error);
        });
    }

    /**
     *
     * @param project
     * @param mutex_user
     * @returns {IHttpPromise<T>}
     */
    lockProject(project: IProject, mutex_user: string = null): angular.IPromise<zm.common.IProject> {
      return this.$http.post(`${this.API_AUTH_URL}/projects/${project.id}/setMutex`, {
        mutex_user
      }, {
        params: this.getQueryParams()
      })
        .then((response: IQueryResponse) => {
          let project: IProject = response.data['project'];
          this.$log.debug(project);
          // TODO handle problems with missing included "pageformat" and "user"
          return this.readProject(project.id);
        })
        .catch((error) => {
          this.$log.warn(error);
        });
    }

    /**
     *
     * @param id
     * @return {angular.IPromise<zm.common.IProject>}
     */
    deleteProject(id: string): angular.IPromise<zm.common.IProject> {
      return this.readProject(id);
    }

    /**
     *
     * @param project
     * @param offset
     * @param limit
     */
    readProjectHistory(project: IProject, offset: number, limit: number): angular.IPromise<IQueryResponse> {
      const qp: IQueryParams = this.zmQueryService.buildQueryParams();
      qp
        .setOffset(offset)
        .setLimit(limit)
        .setOrder('date', 'desc');

      return this.$http.get(`${this.API_AUTH_URL}/projects/${project.id}/history`, {
        params: qp.params
      })
        .then((response: angular.IHttpPromiseCallbackArg) => {
          return response.data;
        });
    }

    /**
     *
     * @returns {{}}
     */
    private getQueryParams(): {} {
      const qp: IQueryParams = this.zmQueryService.buildQueryParams();

      qp.addInclude('pageformat')
        .addInclude('user');

      return qp.params;
    }

  }

  angular.module('common.services.projectrest', [])
    .service('zmProjectRestService', ProjectRestService);
})();
