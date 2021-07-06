import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialUiModule } from '@app/material-ui';
import { BooksModule } from '@app/books';
import { SharedModule, LoggingInterceptor } from '@app/shared';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

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
    BooksModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
