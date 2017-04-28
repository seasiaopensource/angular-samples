(function () {
  'use strict';

  angular
    .module('common', [
      'ngMaterial',

      'common.services',
      'common.directives',
      'common.model',
      'common.dialogs',
      'common.components',
      'common.filters'
    ]);
})();


declare module zm {
  export module common {

    /**
     *
     */
    interface IProject {
      id: string;
      customer_id: string;
      user_id: string;
      name: string;
      free: boolean;
      mutex_user: string;
      mutex_time: number;
      format: IPageFormat;
      created_at: Date;
      updated_at: Date;
      versions: any;
      version: number;
      price: string;
      is_template: boolean;
      projectpages_count: number;
      thumbnail: string;
      author: string;
      setupStage?: string;
      state?: number;
      loaded?: boolean;
      edited?: boolean;
      saved?: boolean;
      saving?: boolean;
    }
    /**
     *
     */
    interface IProjectHistory {
      version: number;
      date: string | Date;
    }
    /**
     *
     */
    interface IPageFormat {
      id: string;
      medium: number;
      orientation?: number;
      provider?: number;
      name: string;
      width: number;
      height: number;
      unit: number;
      free?: boolean;
    }
    /**
     *
     */
    interface IPage {
      id: string;
      displayorder: number;
      created_at: Date;
      updated_at: Date;
      content_stable?: string;
      json: string;
      svg: string;
      src?: string;
      thumbURL?: string;
      thumbnail: string;
      buildSvg: (dimensions: IDimensions, color?: string) => void;
    }
    /**
     *
     */
    interface IDimensions {
      width: number;
      height: number;
    }
    /**
     *
     */
    interface IPosition {
      left: number;
      top: number;
    }
    /**
     *
     */
    interface IAsset {
      id: string;
      type: number;
      mime_type: string;
      editable: boolean;
      created_at: Date;
      updated_at: Date;
      name: string;
      thumbURL?: string;
      thumbnail: string;
      author: string;
      content: IAssetContent;
      price: number;
      free?: boolean;
      tags?: string[];
      industries?: string[];
      meta?: Object;
      wildCardType?: number;
      themes?: string[];
      freehandType?: number;
    }
    /**
     *
     */
    interface IAssetContent {
      width: number;
      height: number;
      src?: string;
      dim?: IDimensions;
      pos?: IPosition;
      fmt?: ITextFormatting;
      color?: string;
      type?: number;
      svg?: string;
      text?: string;
      fontSize?: number;
      fillable?: boolean;
    }
    /**
     *
     */
    interface IAssetPrice {
      value: number;
      currency: string;
      free?: boolean;
      caption?: string;
    }
    /**
     *
     */
    interface IAssetPredicate {
      my?: boolean;
      external?: boolean;
      used?: boolean;
    }
    /**
     * A Tile that can be edited in the TileGenerator and used as a template inside of the Creator
     */
      // TODO @harald check whether additional properties are needed
    interface ITile extends IAssetContent {
      assets?: IAsset[];
      wildcards?: IWildcard[];
      addAsset?: (asset: IAsset) => ITile;
      addWildcard?: (wildcard: IWildcard) => ITile;
    }
    /**
     * A placeholder that can be used in a Tile and be linked to a Product
     */
      // TODO @harald add more properties
    interface IWildcard {
      type: number;
      mapToDatabase: string;  // entspricht
      dim?: IDimensions;
      pos?: IPosition;
      fmt?: ITextFormatting;
    }
    /**
     *
     */
    interface IUserInfo {
      attachment_token: string;
      created_at: string;
      customer_id: string;
      email: string;
      id: string;
      name: string;
      status: number;
      updated_at: string;
      validated_at: any;
      validationcode: string;
    }
    /**
     *
     */
    interface IPermissionsAboAddons {
      addFiveHundregGB: boolean;
      addTerraByte: boolean;
    }
    /**
     *
     */
    interface IPermissionsAboCreate {
      canCreate: boolean;
      canGenerate: boolean;
      canOpenEditor: boolean;
      canPublish: boolean;
      canShare: boolean;
      canUploadAssets: boolean;
      canUseCreate: boolean;
    }
    /**
     *
     */
    interface IPermissionsAboManage {
      isDataPoolManager: boolean;
      isFileManager: boolean;
      isPermissionManager: boolean;
      isProductManager: boolean;
    }
    /**
     *
     */
    interface IPermissionsAboMydesk {
      isAdditionalWorkflowManager: boolean;
      isAnalysisManager: boolean;
      isCalendarAccount: boolean;
      isContactManager: boolean;
      isDashboardManager: boolean;
      isGanttManager: boolean;
      isMessengerAccount: boolean;
      isTrendManager: boolean;
      isWorkflowManager: boolean;
    }
    /**
     *
     */
    interface IPermissionsServices {
      isReportCreator: boolean;
      isUploadServiceUser: boolean;
    }
    /**
     *
     */
    interface IPermissionsAboSahre {
      isContentBocUser: boolean;
      isOverviewManager: boolean;
      isSocialConnector: boolean;
      isSocialHubUser: boolean;
      isSocialMediaUser: boolean;
    }
    /**
     *
     */
    interface IPermissionsAbo {
      addons: IPermissionsAboAddons;
      create: IPermissionsAboCreate;
      manage: IPermissionsAboManage;
      mydesk: IPermissionsAboMydesk;
      services: IPermissionsServices;
      share: IPermissionsAboSahre;
    }
    /**
     *
     */
    interface IPermissionsCreate {
      create: IPermissionCreateCreate;
      mycontent: IPermissionCreateMycontent;
      mycontentadvertisingprojects: IPermissionCreateCreateMycontentadvertisingprojects;
      mycontentdesignelements: IPermissionsCreateMycontentdesignelements;
    }
    /**
     *
     */
    interface IPermissionCreateCreate {
      canCreateProjects: boolean;
      canDisplayCreate: boolean;
    }
    /**
     *
     */
    interface IPermissionCreateMycontent {
      canDisplayMyContent: boolean;
    }
    /**
     *
     */
    interface IPermissionCreateCreateMycontentadvertisingprojects {
      canAddProjectFolders: boolean;
      canDeleteProjectFolders: boolean;
      canDeleteProjects: boolean;
      canDisplayProjects: boolean;
      canEditFolders: boolean;
      canEditProjects: boolean;
    }
    /**
     *
     */
    interface IPermissionsCreateMycontentdesignelements {
      canAddDesignElementFolders: boolean;
      canDeleteAssets: boolean;
      canDeleteDesignElementFolders: boolean;
      canDisplayDesignElements: boolean;
      canEditAssets: boolean;
      canEditFoldersOnCreate: boolean;
    }
    /**
     *
     */
    interface IPermissionsFilemanagerFilemanagerdownload {
      canDownloadShares: boolean;
    }
    /**
     *
     */
    interface IPermissionsFilemanagerFilemanagerfiles {
      canAddShareFolders: boolean;
      canDisplayFileManagerFiles: boolean;
      canMoveShares: boolean;
    }
    /**
     *
     */
    interface IPermissionsFilemanagerFilemanagermoveto {
      canDisplayFiMaMoves: boolean;
    }
    /**
     *
     */
    interface IPermissionsFilemanagerFilemanagershare {
      canAddContentboxes: boolean;
      canAddLinks: boolean;
      canAddSocialPosts: boolean;
      canDisplayFileManagerShares: boolean;
      canMoveToContentboxes: boolean;
    }
    /**
     *
     */
    interface IPermissionsFilemanager {
      filemanagerdownload: IPermissionsFilemanagerFilemanagerdownload;
      filemanagerfiles: IPermissionsFilemanagerFilemanagerfiles;
      filemanagermoveto: IPermissionsFilemanagerFilemanagermoveto;
      filemanagershare: IPermissionsFilemanagerFilemanagershare;
    }
    /**
     *
     */
    interface IPermissionsManageCustomers {
      canAddCustomers: boolean;
      canChangeCustomerStatuss: boolean;
      canDeleteCustomers: boolean;
      canDisplayCustomers: boolean;
      canEditCustomers: boolean;
    }
    /**
     *
     */
    interface IPermissionsManageFiles {
      canAddManageFolder: boolean;
      canDeleteFiles: boolean;
      canDeleteManageFolders: boolean;
      canDisplayFiles: boolean;
      canEditFiles: boolean;
      canEditManageFolders: boolean;
    }
    /**
     *
     */
    interface IPermissionsManageManage {
      canDisplayManage: boolean;
    }
    /**
     *
     */
    interface IPermissionsManageProducts {
      canAddProducts: boolean;
      canDeleteProducts: boolean;
      canDisplayProductss: boolean;
      canEditProducts: boolean;
    }
    /**
     *
     */
    interface IPermissionsManage {
      customers: IPermissionsManageCustomers;
      files: IPermissionsManageFiles;
      manage: IPermissionsManageManage;
      products: IPermissionsManageProducts;
    }
    /**
     *
     */
    interface IPermissionsMydeskAnalytics {
      canDisplayAnalytics: boolean;
      canDisplayAnalyticsCreate: boolean;
      canDisplayAnalyticsManage: boolean;
      canDisplayAnalyticsShare: boolean;
    }
    /**
     *
     */
    interface IPermissionsMydeskCalendar {
      canDisplayCalendars: boolean;
    }
    /**
     *
     */
    interface IPermissionsMydeskContacts {
      canAddCommunityContacts: boolean;
      canAddCompanys: boolean;
      canAddContacts: boolean;
      canChangeCommunityContactStatuss: boolean;
      canChangeCompanyStatus: boolean;
      canChangeContactStatus: boolean;
      canDeleteCommunityContacts: boolean;
      canDeleteCompanys: boolean;
      canDeleteContacts: boolean;
      canDisplayContacts: boolean;
      canEditCommunityContacts: boolean;
      canEditCompanys: boolean;
      canEditContacts: boolean;
    }
    /**
     *
     */
    interface IPermissionsMydeskDashboard {
      canDisplayContentBoxes: boolean;
      canDisplayCustomerData: boolean;
      canDisplayDashboard: boolean;
      canDisplayProductData: boolean;
      canDisplayProjects: boolean;
      canDisplaySelectedPlan: boolean;
      canDisplaySpent: boolean;
      canDisplayStorages: boolean;
      canDisplayUsers: boolean;
    }
    /**
     *
     */
    interface IPermissionsGanttchart {
      canAddRows: boolean;
      canAddTasks: boolean;
      canDisplayGanttCharts: boolean;
      canEditRows: boolean;
      canEditTasks: boolean;
    }
    /**
     *
     */
    interface IPermissionsGoogletrends {
      canDisplayTrends: boolean;
    }
    /**
     *
     */
    interface IPermissionsTodo {
      canDisplayToDo: boolean;
    }
    /**
     *
     */
    interface IPermissionsWorkflow {
      canAddWorkflows: boolean;
      canDeleteWorkflows: boolean;
      canDisplayWorkflow: boolean;
      canEditWorkflows: boolean;
    }
    /**
     *
     */
    interface IPermissionsMydesk {
      analytics: IPermissionsMydeskAnalytics;
      calendar: IPermissionsMydeskCalendar;
      contacts: IPermissionsMydeskContacts;
      dashboard: IPermissionsMydeskDashboard;
      ganttchart: IPermissionsGanttchart;
      googletrends: IPermissionsGoogletrends;
      todo: IPermissionsTodo;
      workflow: IPermissionsWorkflow;
    }
    /**
     *
     */
    interface IPermissionsMyprofileGroup {
      canAddGroups: boolean;
      canDeleteGroups: boolean;
      canDisplayGroups: boolean;
      canEditGroups: boolean;
    }
    /**
     *
     */
    interface IPermissionsMyprofilePermissions {
      canDisplayPermissions: boolean;
      canEditPermissions: boolean;
    }
    /**
     *
     */
    interface IPermissionsMyprofilePlan {
      canDisplayPlans: boolean;
      canEditAdditionalServices: boolean;
      canEditPlans: boolean;
      canEditStorage: boolean;
      canEditUsers: boolean;
      canShowInvoicess: boolean;
      canTerminateContracts: boolean;
    }
    /**
     *
     */
    interface IPermissionsMyprofileSocialmediaaccounts {
      canAddSocialMediaAccounts: boolean;
      canDeleteSocialMediaAccounts: boolean;
      canDisplaySocialMediaAccounts: boolean;
      canEditSocialMediaAccounts: boolean;
    }
    /**
     *
     */
    interface IPermissionsMyprofileUser {
      canAddUsers: boolean;
      canDeleteUsers: boolean;
      canDisplayUsers: boolean;
      canEditUsers: boolean;
    }
    /**
     *
     */
    interface IPermissionsMyprofile {
      group: IPermissionsMyprofileGroup;
      permissions: IPermissionsMyprofilePermissions;
      plan: IPermissionsMyprofilePlan;
      socialmediaaccounts: IPermissionsMyprofileSocialmediaaccounts;
      user: IPermissionsMyprofileUser;
    }
    /**
     *
     */
    interface IPermissionsShareContentbox {
      canDisplayContentBoxes: boolean;
    }
    /**
     *
     */
    interface IPermissionsShareContentboxIn {
      canDeleteInboxes: boolean;
      canEditInboxes: boolean;
    }
    /**
     *
     */
    interface IPermissionsShareContentboxOut {
      canAddOutboxes: boolean;
      canDeleteOutboxes: boolean;
      canEditOutboxes: boolean;
    }
    /**
     *
     */
    interface IPermissionsShareNewshub {
      canAddComments: boolean;
      canAddPosts: boolean;
      canDeleteAllCommentss: boolean;
      canDeleteOwnPostss: boolean;
      canDeleteOwnComments: boolean;
      canDisplayHubs: boolean;
      canEditOwnComments: boolean;
      canEditOwnPosts: boolean;
    }
    /**
     *
     */
    interface IPermissionsShareOverview {
      canDisplayOverviews: boolean;
    }
    /**
     *
     */
    interface IPermissionsShareShare {
      canDeletePosts: boolean;
      canDisplayShare: boolean;
      canEditPosts: boolean;
    }
    /**
     *
     */
    interface IPermissionsShareSocialmedia {
      canDisplaySocialMedias: boolean;
    }
    /**
     *
     */
    interface IPermissionsShare {
      content_box: IPermissionsShareContentbox;
      content_box__inbox: IPermissionsShareContentboxIn;
      content_box__outbox: IPermissionsShareContentboxOut;
      news_hub: IPermissionsShareNewshub;
      overview: IPermissionsShareOverview;
      share: IPermissionsShareShare;
      social_media: IPermissionsShareSocialmedia;
    }
    /**
     *
     */
    interface IPermissions {
      abo: IPermissionsAbo;
      create: IPermissionsCreate;
      filemanager: IPermissionsFilemanager;
      manage: IPermissionsManage;
      mydesk: IPermissionsMydesk;
      myprofile: IPermissionsMyprofile;
      share: IPermissionsShare;
    }
    /**
     *
     */
    interface IApiMe {
      accountProperties: any[];
      permissions: IPermissions;
      status: any;
      user: IUserInfo;
    }
    /**
     * A Node that can be displayed in the Explorer / Creator
     */
    interface IExplorerNode {
      id: string;
      type: number;
      contentType: number;
      name: string;
      displayorder: number;
      description?: string;
      size: number;
      location: string;
      created_at?: Date;
      updated_at?: Date;
      updatedBy: string;
      thumbnail: string;
      avatar?: string;
      icon?: string;
      author: string;
      fixed?: boolean;
      depth: number;
      content?: Object;
      childCount: number;
      ancestor: IExplorerNode;
      useInCreator?: boolean;
    }
    /**
     * A Query Parameters class that can be used to configure the "params" property for GET requests
     */
    interface IQueryParams {
      setOrder: (field: string, order?: string) => IQueryParams;
      addOrder: (field: string, order?: string) => IQueryParams;
      addOrders: (...orders: string[]) => IQueryParams;
      removeOrders: () => IQueryParams;
      addFilter: (filter: IQueryFilter) => IQueryParams;
      addFilters: (...filters: IQueryFilter[]) => IQueryParams;
      removeFilter: (field: string) => IQueryParams;
      removeFilters: () => IQueryParams;
      addRestriction: (field: string) => IQueryParams;
      addRestrictions: (...fields: string[]) => IQueryParams;
      removeRestrictions: () => IQueryParams;
      addInclude: (field: string) => IQueryParams;
      setOffset: (offset: number) => IQueryParams;
      removeOffset: () => IQueryParams;
      setLimit: (limit: number) => IQueryParams;
      removeLimit: () => IQueryParams;
      removeAll: () => IQueryParams;
      toParams: () => {};
      params: {};
    }
    /**
     * A single query order
     */
    interface IQueryOrder {
      field: string;
      order?: string;
    }
    /**
     * A single query filter
     */
    interface IQueryFilter {
      field: string;
      from?: any;
      to?: any;
      value?: any;
      contains?: any;
      notEqual?: any;
    }
    /**
     *
     */
    interface IQueryResponse<T> {
      data: T;
      pagination: IPagination;
    }
    /**
     *
     */
    interface IPagination {
      items: {
        limit: number;
        count: number;
      };
      page: {
        current: number;
        max: number;
        next: number;
        previous: number;
      };
    }
    /**
     * A single Industry
     */
    interface IIndustry {
      id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
      description?: string;
      thumbURL: string;
      thumbnail: string;
      selected?: boolean;
    }
    /**
     * A single theme
     */
    interface ITheme {
      id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
      description?: string;
      selected?: boolean;
    }

    interface IProfiePlan {
      plan: string;
      users: Object;
      storage: Object;
      services: Object;
    }

    /**
     * Interface to be implemented in profile section
     */
    interface IProfile {
      readUser();
      about: any;
    }
  }
}
