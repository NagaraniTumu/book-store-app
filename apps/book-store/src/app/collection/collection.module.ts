import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { SharedModule } from '@app/shared';
import { MaterialUiModule } from '@app/material-ui';

import { CollectionComponent } from './collection.component';

@NgModule({
  declarations: [CollectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule,
    MaterialUiModule,
  ],
})
export class CollectionModule {}
