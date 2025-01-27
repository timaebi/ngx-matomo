import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MATOMO_ROUTER_CONFIGURATION, MatomoRouterConfiguration } from './configuration';
import { MatomoRouter } from './matomo-router.service';

@NgModule()
export class NgxMatomoRouterModule {
  constructor(
    private readonly router: MatomoRouter,
    @Optional() @SkipSelf() parent?: NgxMatomoRouterModule
  ) {
    if (!parent) {
      // Do not initialize if it is already (by a parent module)
      this.router.init();
    }
  }

  static forRoot(
    config: MatomoRouterConfiguration = {}
  ): ModuleWithProviders<NgxMatomoRouterModule> {
    return {
      ngModule: NgxMatomoRouterModule,
      providers: [{ provide: MATOMO_ROUTER_CONFIGURATION, useValue: config }],
    };
  }
}
