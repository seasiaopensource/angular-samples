/**
 * Created by gerd on 16.02.16.
 */
describe('Service: zmPageService', () => {
  let zmPageService, $httpBackend;

  beforeEach(angular.mock.module('common'));

  describe('Public API', () => {
    it('should expose a "createPage" method', () => {
      expect(zmPageService.addPage).toBeDefined();
      expect(zmPageService.addPage).toEqual(jasmine.any(Function));
    });
    it('should expose a "duplicatePage" method', () => {
      expect(zmPageService.duplicatePage).toBeDefined();
      expect(zmPageService.duplicatePage).toEqual(jasmine.any(Function));
    });
    it('should expose a "readPages" method', () => {
      expect(zmPageService.readPages).toBeDefined();
      expect(zmPageService.readPages).toEqual(jasmine.any(Function));
    });
    it('should expose a "readPage" method', () => {
      expect(zmPageService.readPage).toBeDefined();
      expect(zmPageService.readPage).toEqual(jasmine.any(Function));
    });
    it('should expose a "updatePage" method', () => {
      expect(zmPageService.updatePage).toBeDefined();
      expect(zmPageService.updatePage).toEqual(jasmine.any(Function));
    });
    it('should expose a "deletePage" method', () => {
      expect(zmPageService.deletePage).toBeDefined();
      expect(zmPageService.deletePage).toEqual(jasmine.any(Function));
    });
  });

});
