import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialUiModule } from '@app/material-ui';

import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { ArrayToStringPipe } from './pipes/array-to-string/array-to-string.pipe';

import { MatCardComponent } from './components/mat-card/mat-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    EllipsisPipe,
    ArrayToStringPipe,
    MatCardComponent,
    StarRatingComponent,
  ],
  imports: [CommonModule, HttpClientModule, MaterialUiModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    EllipsisPipe,
    ArrayToStringPipe,
    MatCardComponent,
    StarRatingComponent,
  ],
})
export class SharedModule {}
