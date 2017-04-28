/**
 * Created by gerd on 01.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class ProjectService {
    private _projects: IProject[];

    /**
     *
     * @param zmProjectRestService
     * @param zmProject
     * @param $q
     * @param MockProject
     * @param zmPageFormatService
     * @param zmPageService
     * @param zmQueryService
     * @param $log
     */
    constructor(private zmProjectRestService, private zmProject, private $q: angular.IQService, private MockProject: IProject, private zmPageFormatService, private zmPageService, private zmQueryService, private zmDialogService, private $log: angular.ILogService) {
      this._projects = [this.MockProject];
    }

    /**
     *
     * @returns {JQueryDeferred<IProject>|string|string[]|angular.IPromise<IProject>|angular.IPromise<void>|void|*}
     * @param name
     * @param format
     */
    createProject(name: string, format: IPageFormat): angular.IPromise<IProject> {
      return this.$q((resolve: angular.IQResolveReject) => {
        // handle new pageformat
        if (format.free) {
          this.zmPageFormatService.createPageFormat(format)
            .then((result: IPageFormat) => {
              resolve(this.zmProjectRestService.createProject(name, result.id));
            });
        } else {
          resolve(this.zmProjectRestService.createProject(name, format.id));
        }
      });
    }

    /**
     *
     * @return {angular.IPromise<IProject[]>|angular.IPromise<IProject>}
     */
    readProjects(qp: IQueryParams = this.zmQueryService.buildQueryParams()): angular.IPromise<IProject[]> {
      return this.zmProjectRestService.readProjects(qp)
        .then((projects: IProject[]) => projects.map((p: IProject) => this.toProject(p)));
    }

    /**
     *
     * @param id
     * @return {angular.IPromise<IProject>}
     */
    readProject(id: string): angular.IPromise<IProject> {
      return this.zmProjectRestService.readProject(id)
        .then((project: zm.common.IProject) => angular.isDefined(project) ? this.toProject(project) : this.$q.reject(new Error(`No project found for id: ${id}`))); // angular.copy(this._projects[0])
    }

    /**
     *
     * @param project
     * @param pages
     */
    updateProject(project: IProject, pages: IPage[]): angular.IPromise<IProject> {
      // TODO debugging
      this.zmDialogService.showAlert('updateProject', `Saving "${project.name}" with "${pages.length}" pages.`);
      project.saving = true;
      return this.$q((resolve, reject) => {
        this.zmProjectRestService.updateProject(this.toObject(project), true, pages)
          .then((result2) => {
            const project2: IProject = angular.merge(project, result2);
            project2.saved = true;
            // TODO debugging
            this.zmDialogService.showAlert('updateProject', `Saved "${project2.name}" with "${pages.length}" pages at "${project2.updated_at}".`);
            resolve({
              project: project2,
              pages
            });
          })
          .catch(reject);
      });
    }

    /**
     *
     * @param project
     * @return {IPromise<T>}
     */
    duplicateProject(project: IProject): angular.IPromise<string> {
      // TODO do we need to handle the pages of the project?
      return this.$q((resolve, reject) => {
        this.zmProjectRestService.duplicateProject(project)
          .then((id: string) => resolve(id))
          .catch(reject);
      });
    }

    /**
     *
     * @param project
     * @param userid
     * @returns {angular.IPromise<any>}
     */
    lockProject(project: IProject, userid?: string): angular.IPromise<any> {
      return this.zmProjectRestService.lockProject(project, userid)
        .then((result: IProject) => this.toProject(result));
    }

    /**
     *
     * @param id
     * @return {angular.IPromise<IProject>|angular.IPromise<IProject, Error>|undefined}
     */
    deleteProject(id: string): angular.IPromise<IProject> {
      return this.zmProjectRestService.deleteProject(id)
        .then((project: IProject) => {
          let index: number = this._projects.indexOf(project);
          this._projects.splice(index, 1);
          return project;
        });
    }

    /**
     *
     * @param project
     * @param offset
     * @param limit
     * @returns {angular.IPromise<any>}
     */
    readProjectHistory(project: IProject, offset: number = 0, limit: number = 10): angular.IPromise<{history: zm.common.IProjectHistory[], pagination: zm.common.IPagination}> {
      return this.zmProjectRestService.readProjectHistory(project, offset, limit)
        .then((response: IQueryResponse) => {
          let history: zm.common.IProjectHistory[] = response['history'].map((entry: zm.common.IProjectHistory) => {
            return {
              version: entry.version,
              date: new Date(entry.date.toString())
            };
          });
          return {
            history: history,
            pagination: response.pagination
          };
        });
    }

    downloadProject(): any {
    }

    printProject(): any {
    }

    shareProject(): any {
    }

    buyAsset(): any {
    }

    /**
     *
     * @param obj
     * @returns {IProject}
     */
    private toProject(obj: zm.common.IProject): zm.common.IProject {
      let project: IProject = new this.zmProject(
        obj.id,
        obj.customer_id,
        obj.user_id,
        obj.name,
        obj.free,
        obj.mutex_user,
        obj.mutex_time,
        obj['pageformat'],
        obj.created_at,
        obj.updated_at,
        obj.versions,
        obj.version,
        obj.price,
        obj.is_template,
        obj.projectpages_count,
        obj['thumbURL'],
        obj['user']['name']
      );
      // this.$log.debug(project);
      return project;
    }

    /**
     *
     * @param project
     * @returns {zm.common.IProject}
     */
    private toObject(project: zm.common.IProject): any {
      let obj = angular.copy(project);
      obj['pageformat_id'] = obj.format.id;
      delete obj.format;
      delete obj.author;
      return obj;
    }
  }

  angular.module('common.services.project', [])
    .service('zmProjectService', ProjectService);
})();
