import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AppRoutingModule } from './app.routes';
import { PipesModule } from '@pipes/pipes.module';
import { HttpErrorInterceptor } from '@infrastructure/services/http-error.interceptor';
import { HttpRequestInterceptor } from '@infrastructure/services/http-request.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from '@angular/common';
import { getEspPaginatorIntl } from './esp-paginator-intl';
import { ComponentsModule } from '@components/components.module';
import { ModalsModule } from '@modals/modals.module';

// import { FilterPipe } from './pipe/filter.pipe';

registerLocaleData( localeEs, 'es-EC' );


@NgModule({
  declarations: [AppComponent,BlankComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    FullComponent,
    PipesModule,
    ComponentsModule,
    ModalsModule
  ],
  exports: [TablerIconsModule],
  providers:[
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    ],
    { provide: LOCALE_ID , useValue: 'es-EC' },
    {provide: MatPaginatorIntl, useFactory: getEspPaginatorIntl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
