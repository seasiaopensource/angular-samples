/**
 * Created on 08.02.16.
 */

(function () {
  'use strict';

  /**
   *
   */
  enum ProjectState {
    Loaded, Edited, Saved, Saving
  }

  /**
   *
   */
  class Project implements zm.common.IProject {
    constructor(public id: string,
                public customer_id: string,
                public user_id: string,
                public name: string,
                public free: boolean,
                public mutex_user: string,
                public mutex_time: number,
                public format: zm.common.IPageFormat,
                public created_at: Date,
                public updated_at: Date,
                public versions: any,
                public version: number,
                public price: string,
                public is_template: boolean = false,
                public projectpages_count: number,
                public thumbnail: string,
                public author: string,
                public state: ProjectState = ProjectState.Saved) {

      this.is_template = Boolean(this.is_template);
    }

	  /**
     *
     * @param bool
     */
    set loaded(bool: boolean) {
      if (bool) {
        this.state = ProjectState.Loaded;
      }
    }

	  /**
     *
     * @returns {boolean}
     */
    get loaded(): boolean {
      return this.state === ProjectState.Loaded;
    }

    /**
     *
     * @param bool
     */
    set edited(bool: boolean) {
      if (bool) {
        this.state = ProjectState.Edited;
      }
    }

    /**
     *
     * @returns {boolean}
     */
    get edited(): boolean {
      return this.state === ProjectState.Edited;
    }

    /**
     *
     * @param bool
     */
    set saved(bool: boolean) {
      if (bool) {
        this.state = ProjectState.Saved;
      }
    }

    /**
     *
     * @returns {boolean}
     */
    get saved(): boolean {
      return this.state === ProjectState.Saved;
    }

    /**
     *
     * @param bool
     */
    set saving(bool: boolean) {
      if (bool) {
        this.state = ProjectState.Saving;
      }
    }

    /**
     *
     * @returns {boolean}
     */
    get saving(): boolean {
      return this.state === ProjectState.Saving;
    }
  }

  const format: zm.common.IPageFormat = {
    id: '5',
    medium: 0,
    orientation: 0,
    name: 'DIN A4',
    width: 210,
    height: 297,
    unit: 0
  };

  const MockProject = new Project('6AoE5jglNY', null, null, 'Test Project', true, null, null, format, new Date(Date.UTC(2016, 1, 9, 12)), new Date(Date.UTC(2016, 1, 9, 12)), {}, 1, '0.000', false, 1, 'http://placehold.it/100x141', 'Max Muster');

  angular.module('common.model.project', [])
    .value('zmProject', Project)
    .value('zmProjectState', ProjectState)
    .value('MockProject', MockProject);
})();
