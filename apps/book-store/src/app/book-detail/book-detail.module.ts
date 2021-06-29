import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialUiModule } from '@app/material-ui';
import { SharedModule } from '@app/shared';
import { BookDetailRoutingModule } from './book-detail-routing.module';

import { BookDetailComponent } from './book-detail.component';

@NgModule({
  declarations: [BookDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BookDetailRoutingModule,
    SharedModule,
    MaterialUiModule,
  ],
})
export class BookDetailModule {}
