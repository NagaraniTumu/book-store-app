import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { MaterialUiModule } from '@app/material-ui';
import { SharedModule } from '@app/shared';

import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, CartRoutingModule, SharedModule, MaterialUiModule],
})
export class CartModule {}
