import ITranslateProvider = angular.translate.ITranslateProvider;
/**
 * Created by gerd on 01.02.16.
 */
describe('Service: zmProjectService', () => {
  let zmProjectService, $httpBackend;

  beforeEach(angular.mock.module('common'));

  /**
   * Needed to suppress asynchronous loading of translations
   * {@link http://angular-translate.github.io/docs/#/guide/22_unit-testing-with-angular-translate}
   */
  // beforeEach(angular.mock.module('transparentcom', function ($translateProvider: ITranslateProvider) {
  //   $translateProvider.translations('en', {});
  // }));

  beforeEach(angular.mock.inject((_zmProjectService_, _$httpBackend_: angular.IHttpBackendService) => {
    zmProjectService = _zmProjectService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Public API', () => {
    it('should expose a "createProject" method', () => {
      expect(zmProjectService.createProject).toBeDefined();
      expect(zmProjectService.createProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "readProjects" method', () => {
      expect(zmProjectService.readProjects).toBeDefined();
      expect(zmProjectService.readProjects).toEqual(jasmine.any(Function));
    });
    it('should expose a "readProject" method', () => {
      expect(zmProjectService.readProject).toBeDefined();
      expect(zmProjectService.readProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "updateProject" method', () => {
      expect(zmProjectService.updateProject).toBeDefined();
      expect(zmProjectService.updateProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "deleteProject" method', () => {
      expect(zmProjectService.deleteProject).toBeDefined();
      expect(zmProjectService.deleteProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "downloadProject" method', () => {
      expect(zmProjectService.downloadProject).toBeDefined();
      expect(zmProjectService.downloadProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "printProject" method', () => {
      expect(zmProjectService.printProject).toBeDefined();
      expect(zmProjectService.printProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "shareProject" method', () => {
      expect(zmProjectService.shareProject).toBeDefined();
      expect(zmProjectService.shareProject).toEqual(jasmine.any(Function));
    });
    it('should expose a "buyAsset" method', () => {
      expect(zmProjectService.buyAsset).toBeDefined();
      expect(zmProjectService.buyAsset).toEqual(jasmine.any(Function));
    });
  });

  describe('createProject()', () => {
    let API_URL: string;
    let MockProject: IProject;

    beforeEach(angular.mock.inject((_API_URL_, _MockProject_) => {
      API_URL = _API_URL_;
      MockProject = _MockProject_;
    }));

    beforeEach(() => {
      $httpBackend.whenPOST(`${API_URL}/projects`)
        .respond(MockProject);
    });

    it('should call the REST API with the given object', () => {
      zmProjectService.createProject(MockProject);

      $httpBackend.expectPOST(`${API_URL}/projects`, MockProject);

      $httpBackend.flush();
    });

    it('should be resolved with a project with a id', () => {
      let promise = zmProjectService.createProject(MockProject);

      expect(promise).toBeDefined();
      expect(promise.then).toEqual(jasmine.any(Function));

      promise.then(result => {
        expect(result.id).toEqual(MockProject.id);
      });

      $httpBackend.flush();
    });
  });

  describe('readProject()', () => {
    let API_URL: string;
    let MockProject: IProject;

    beforeEach(angular.mock.inject((_API_URL_, _MockProject_) => {
      API_URL = _API_URL_;
      MockProject = _MockProject_;
    }));

    beforeEach(() => {
      $httpBackend.whenGET(`${API_URL}/projects/42`)
        .respond(MockProject);
    });

    it('should call the REST API with the given id', () => {
      zmProjectService.readProject('42');

      $httpBackend.expectGET(`${API_URL}/projects/42`);

      $httpBackend.flush();
    });

    it('should be resolved with a project with the given id', () => {
      let promise = zmProjectService.readProject('42');

      expect(promise).toBeDefined();
      expect(promise.then).toEqual(jasmine.any(Function));

      promise.then((project: IProject) => {
        expect(project).toEqual(MockProject);
      });

      $httpBackend.flush();
    });

  });

  describe('deleteProject()', () => {
    let API_URL: string;
    let MockProject: IProject;

    beforeEach(angular.mock.inject((_API_URL_, _MockProject_) => {
      API_URL = _API_URL_;
      MockProject = _MockProject_;
    }));

    beforeEach(() => {
      $httpBackend.whenDELETE(`${API_URL}/projects/42`)
        .respond(MockProject);
    });

    it('should call the REST API with the given id', () => {
      zmProjectService.deleteProject('42');

      $httpBackend.expectDELETE(`${API_URL}/projects/42`);

      $httpBackend.flush();
    });

    it('should be resolved with a project with the given id', () => {
      let promise = zmProjectService.deleteProject('42');

      promise.then((result: IProject) => {
        expect(result.id).toBe('42');
      });

      $httpBackend.flush();
    });

  });

});
