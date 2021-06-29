import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { MaterialUiModule } from '@app/material-ui';

import { BillingInfoComponent } from './billing-info.component';
import { BillingInfoRoutingModule } from './billing-info-routing.module';

@NgModule({
  declarations: [BillingInfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BillingInfoRoutingModule,
    SharedModule,
    MaterialUiModule,
  ],
})
export class BillingInfoModule {}
