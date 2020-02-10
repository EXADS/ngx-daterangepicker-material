import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { DaterangepickerComponent } from './daterangepicker.component';
import { DaterangepickerDirective } from './daterangepicker.directive';
import { LocaleConfig, LOCALE_CONFIG } from './daterangepicker.config';
import { LocaleService } from './locale.service';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  declarations: [
    DaterangepickerComponent,
    DaterangepickerDirective,
    StopPropagationDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [],
  exports: [
    DaterangepickerComponent,
    DaterangepickerDirective
  ],
  entryComponents: [
    DaterangepickerComponent
  ]
})
export class NgxDaterangepickerMd {
  constructor() {
  }
  static forRoot(config: LocaleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxDaterangepickerMd,
      providers: [
        { provide: LOCALE_CONFIG, useValue: config},
        { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG]}
      ]
    };
  }
}
