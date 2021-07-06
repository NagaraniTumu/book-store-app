import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialUiModule } from '@app/material-ui';
import {
  SharedModule,
  LoggingInterceptor,
  BooksService,
} from '@app/shared';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { BooksSearchComponent } from './books-search/books-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ToolBarComponent,
    BooksSearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    SharedModule,
    MaterialUiModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    BooksService,    
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
