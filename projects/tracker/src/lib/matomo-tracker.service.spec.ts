import {MatomoHolder} from './holder';
import {MatomoInstance, MatomoTracker} from './matomo-tracker.service';
import {Getters, Methods} from './types';

declare var window: MatomoHolder;

describe('MatomoTracker', () => {

  beforeEach(() => {
    window._paq = [];
  });

  it('should throw an error if Matomo has not been initialized', () => {
    // Given
    delete (window as Partial<MatomoHolder>)._paq;

    // Then
    expect(() => new MatomoTracker()).toThrow();
  });

  function expectPush(when: (tracker: MatomoTracker) => void, expected: unknown[][]): () => void {
    return () => {
      // When
      when(new MatomoTracker());
      // Then
      expect(window._paq).toEqual(expected);
    };
  }

  function expectSimpleMethod<M extends Methods<MatomoTracker>>(method: M, args: Parameters<MatomoTracker[M]>): () => void {
    return expectPush(
      t => (t[method] as any)(...args),
      [[method, ...args]],
    );
  }

  it('should track page view', expectSimpleMethod(
    'trackPageView',
    [],
  ));

  it('should track page view with custom title', expectSimpleMethod(
    'trackPageView',
    ['custom title'],
  ));

  it('should track event', expectSimpleMethod(
    'trackEvent',
    ['myCategory', 'myAction', 'myName', 42],
  ));

  it('should track event without name/value', expectSimpleMethod(
    'trackEvent',
    ['myCategory', 'myAction'],
  ));

  it('should track site search', expectSimpleMethod(
    'trackSiteSearch',
    ['myKeyword', 'myCategory', 0],
  ));

  it('should track goal', expectSimpleMethod(
    'trackGoal',
    [1, 2],
  ));

  it('should track link', expectSimpleMethod(
    'trackLink',
    ['http://myUrl', 'link'],
  ));

  it('should track download', expectSimpleMethod(
    'trackLink',
    ['http://myUrl', 'download'],
  ));

  it('should track content impressions', expectSimpleMethod(
    'trackAllContentImpressions',
    [],
  ));

  it('should track visible content impressions', expectSimpleMethod(
    'trackVisibleContentImpressions',
    [true, 42],
  ));

  it('should track content impressions within node', expectSimpleMethod(
    'trackContentImpressionsWithinNode',
    [document.createElement('div')],
  ));

  it('should track content interaction with node', expectSimpleMethod(
    'trackContentInteractionNode',
    [document.createElement('div'), 'test'],
  ));

  it('should track content impression', expectSimpleMethod(
    'trackContentImpression',
    ['myContentName', 'myPiece', 'myTarget'],
  ));

  it('should track content interaction', expectSimpleMethod(
    'trackContentInteraction',
    ['myInteraction', 'myContentName', 'myPiece', 'myTarget'],
  ));

  it('should log all content blocks on page (for debugging purpose)', expectSimpleMethod(
    'logAllContentBlocksOnPage',
    [],
  ));

  it('should enable heartbeat timer', expectSimpleMethod(
    'enableHeartBeatTimer',
    [42],
  ));

  it('should enable link tracking', expectSimpleMethod(
    'enableHeartBeatTimer',
    [42],
  ));

  it('should enable cross domain linking', expectSimpleMethod(
    'enableCrossDomainLinking',
    [],
  ));

  it('should set cross domain linking timeout', expectSimpleMethod(
    'setCrossDomainLinkingTimeout',
    [42],
  ));

  it('should set document title', expectSimpleMethod(
    'setDocumentTitle',
    ['test'],
  ));

  it('should set domains', expectSimpleMethod(
    'setDomains',
    [['domain1', 'domain2']],
  ));

  it('should set custom url', expectSimpleMethod(
    'setCustomUrl',
    ['http://url'],
  ));

  it('should set referrer url', expectSimpleMethod(
    'setReferrerUrl',
    ['http://url'],
  ));

  it('should set site id', expectSimpleMethod(
    'setSiteId',
    [100],
  ));

  it('should set api url', expectSimpleMethod(
    'setApiUrl',
    ['http://url'],
  ));

  it('should set tracker url', expectSimpleMethod(
    'setTrackerUrl',
    ['http://url'],
  ));

  it('should set download classes', expectSimpleMethod(
    'setDownloadClasses',
    ['myClass'],
  ));

  it('should set download extensions', expectSimpleMethod(
    'setDownloadExtensions',
    ['docx'],
  ));

  it('should add download extensions', expectSimpleMethod(
    'addDownloadExtensions',
    ['docx'],
  ));

  it('should remove download extensions', expectSimpleMethod(
    'removeDownloadExtensions',
    ['docx'],
  ));

  it('should set ignored classes', expectSimpleMethod(
    'setIgnoreClasses',
    ['myClass'],
  ));

  it('should set link classes', expectSimpleMethod(
    'setLinkClasses',
    ['myClass'],
  ));

  it('should set link tracking timer', expectSimpleMethod(
    'setLinkTrackingTimer',
    [42],
  ));

  it('should set discard hashtag', expectSimpleMethod(
    'discardHashTag',
    [true],
  ));

  it('should set generation time', expectSimpleMethod(
    'setGenerationTimeMs',
    [42],
  ));

  it('should append to tracking url', expectSimpleMethod(
    'appendToTrackingUrl',
    ['?toAppend'],
  ));

  it('should set "DoNotTrack"', expectSimpleMethod(
    'setDoNotTrack',
    [true],
  ));

  it('should kill frame', expectSimpleMethod(
    'killFrame',
    [],
  ));

  it('should redirect file', expectSimpleMethod(
    'redirectFile',
    ['http://url'],
  ));

  it('should set heart beat timer', expectSimpleMethod(
    'setHeartBeatTimer',
    [42, 42],
  ));

  it('should set user id', expectSimpleMethod(
    'setUserId',
    ['foo'],
  ));

  it('should reset user id', expectSimpleMethod(
    'resetUserId',
    [],
  ));

  it('should set custom variable', expectSimpleMethod(
    'setCustomVariable',
    [1, 'name', 'value', 'page'],
  ));

  it('should delete custom variable', expectSimpleMethod(
    'deleteCustomVariable',
    [1, 'scope'],
  ));

  it('should delete custom variables', expectSimpleMethod(
    'deleteCustomVariables',
    ['scope'],
  ));

  it('should store custom variables in cookie', expectSimpleMethod(
    'storeCustomVariablesInCookie',
    [],
  ));

  it('should set custom dimension', expectSimpleMethod(
    'setCustomDimension',
    [1, 'value'],
  ));

  it('should delete custom dimension', expectSimpleMethod(
    'deleteCustomDimension',
    [1],
  ));

  it('should set campaign name key', expectSimpleMethod(
    'setCampaignNameKey',
    ['test'],
  ));

  it('should set campaign keyword key', expectSimpleMethod(
    'setCampaignKeywordKey',
    ['test'],
  ));

  it('should set conversion attribution first referrer', expectSimpleMethod(
    'setConversionAttributionFirstReferrer',
    [true],
  ));

  it('should set ecommerce view', expectSimpleMethod(
    'setEcommerceView',
    ['sku', 'name', 'cat', 42],
  ));

  it('should add ecommerce item', expectSimpleMethod(
    'addEcommerceItem',
    ['sku', 'name', 'cat', 42, 100],
  ));

  it('should track ecommerce cart update', expectSimpleMethod(
    'trackEcommerceCartUpdate',
    [999],
  ));

  it('should track ecommerce order', expectSimpleMethod(
    'trackEcommerceOrder',
    ['orderId', 999],
  ));

  it('should disable cookies', expectSimpleMethod(
    'disableCookies',
    [],
  ));

  it('should delete cookies', expectSimpleMethod(
    'deleteCookies',
    [],
  ));

  it('should set cookie name prefix', expectSimpleMethod(
    'setCookieNamePrefix',
    ['prefix'],
  ));

  it('should set cookie domain', expectSimpleMethod(
    'setCookieDomain',
    ['example'],
  ));

  it('should set cookie path', expectSimpleMethod(
    'setCookiePath',
    ['/example'],
  ));

  it('should set secure cookie', expectSimpleMethod(
    'setSecureCookie',
    [true],
  ));

  it('should set visitor cookie timeout', expectSimpleMethod(
    'setVisitorCookieTimeout',
    [42],
  ));

  it('should set referral cookie timeout', expectSimpleMethod(
    'setReferralCookieTimeout',
    [42],
  ));

  it('should set session cookie timeout', expectSimpleMethod(
    'setSessionCookieTimeout',
    [42],
  ));

  it('should add element click listener', expectSimpleMethod(
    'addListener',
    [document.createElement('div')],
  ));

  it('should set request method', expectSimpleMethod(
    'setRequestMethod',
    ['method'],
  ));

  it('should set custom request processing', expectSimpleMethod(
    'setCustomRequestProcessing',
    [() => null],
  ));

  it('should set request content type', expectSimpleMethod(
    'setRequestContentType',
    ['application/test'],
  ));

  function expectGetter<T, G extends Getters<MatomoTracker, Promise<T>>>(getter: G,
                                                                         mockInstance: Partial<MatomoInstance>,
                                                                         expected: T): Promise<void> {
    // Given
    const tracker = new MatomoTracker();

    spyOn(window._paq, 'push').and.callFake(((...args: any[]) => {
      args[0][0].call(mockInstance);
    }) as any);

    // When
    return (tracker[getter]() as Promise<any>).then(url => {
      // Then
      expect(url).toEqual(expected);
    });
  }

  it('should get Matomo url', done => {
    expectGetter(
      'getMatomoUrl',
      {
        getMatomoUrl(): string {
          return 'http://fakeUrl';
        },
      },
      'http://fakeUrl',
    ).then(done);
  });

  it('should get current url', done => {
    expectGetter(
      'getCurrentUrl',
      {
        getCurrentUrl(): string {
          return 'http://fakeUrl';
        },
      },
      'http://fakeUrl',
    ).then(done);
  });

  it('should get link tracking timer', done => {
    expectGetter(
      'getLinkTrackingTimer',
      {
        getLinkTrackingTimer(): number {
          return 42;
        },
      },
      42,
    ).then(done);
  });

  it('should get visitor id', done => {
    expectGetter(
      'getVisitorId',
      {
        getVisitorId(): string {
          return 'foo';
        },
      },
      'foo',
    ).then(done);
  });

  it('should get visitor info', done => {
    expectGetter(
      'getVisitorInfo',
      {
        getVisitorInfo(): unknown[] {
          return ['foo'];
        },
      },
      ['foo'] as unknown[],
    ).then(done);
  });

  it('should get attribution info', done => {
    expectGetter(
      'getAttributionInfo',
      {
        getAttributionInfo(): string[] {
          return ['foo'];
        },
      },
      ['foo'],
    ).then(done);
  });

  it('should get attribution campaign name', done => {
    expectGetter(
      'getAttributionCampaignName',
      {
        getAttributionCampaignName(): string {
          return 'test';
        },
      },
      'test',
    ).then(done);
  });

  it('should get attribution campaign keyword', done => {
    expectGetter(
      'getAttributionCampaignKeyword',
      {
        getAttributionCampaignKeyword(): string {
          return 'test';
        },
      },
      'test',
    ).then(done);
  });

  it('should get attribution referrer timestamp', done => {
    expectGetter(
      'getAttributionReferrerTimestamp',
      {
        getAttributionReferrerTimestamp(): string {
          return 'test';
        },
      },
      'test',
    ).then(done);
  });

  it('should get attribution referrer url', done => {
    expectGetter(
      'getAttributionReferrerUrl',
      {
        getAttributionReferrerUrl(): string {
          return 'test';
        },
      },
      'test',
    ).then(done);
  });

  it('should get user id', done => {
    expectGetter(
      'getUserId',
      {
        getUserId(): string {
          return 'test';
        },
      },
      'test',
    ).then(done);
  });

  it('should get has cookies', done => {
    expectGetter(
      'hasCookies',
      {
        hasCookies(): boolean {
          return true;
        },
      },
      true,
    ).then(done);
  });

  it('should get custom variable', done => {
    // Given
    const tracker = new MatomoTracker();
    const mockInstance = {
      getCustomVariable(...args: any[]): string {
        return args.join('|');
      },
    } as Partial<MatomoInstance> as MatomoInstance;

    spyOn(window._paq, 'push').and.callFake(((...args: any[]) => {
      args[0][0].call(mockInstance);
    }) as any);

    // When
    tracker.getCustomVariable(0, 'test').then(url => {
      // Then
      expect(url).toEqual('0|test');
    }).then(done);
  });

  it('should get custom variable', done => {
    // Given
    const tracker = new MatomoTracker();
    const mockInstance = {
      getCustomDimension(...args: any[]): string {
        return 'dim-' + args.join('|');
      },
    } as Partial<MatomoInstance> as MatomoInstance;

    spyOn(window._paq, 'push').and.callFake(((...args: any[]) => {
      args[0][0].call(mockInstance);
    }) as any);

    // When
    tracker.getCustomDimension(42).then(url => {
      // Then
      expect(url).toEqual('dim-42');
    }).then(done);
  });

});