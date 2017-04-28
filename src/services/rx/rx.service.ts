/**
 * Created by gerd on 06.08.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class RxService {
    private _subscribers: Map<any, Set<any>>;
    constructor(private Rx, private $log: angular.ILogService) {
      this._subscribers = new Map();
    }

    /**
     *
     * @param subscriber
     * @param subscription
     */
    addSubscription(subscriber: any, subscription: any): RxService {
      let subscriptions: Set<any>;
      if (this._subscribers.has(subscriber)) {
        subscriptions = this._subscribers.get(subscriber);
      } else {
        subscriptions = new Set();
      }
      subscriptions.add(subscription);
      this._subscribers.set(subscriber, subscriptions);
      return this;
    }

    /**
     *
     * @param subscriber
     * @returns {boolean}
     */
    removeSubscriptions(subscriber: any): boolean {
      let subscriptions: Set<any>;
      if (this._subscribers.has(subscriber)) {
        subscriptions = this._subscribers.get(subscriber);
      } else {
        subscriptions = new Set();
      }
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      return this._subscribers.delete(subscriber);
    }
  }

  angular.module('common.services.rx', [])
    .service('zmRxService', RxService);
})();
