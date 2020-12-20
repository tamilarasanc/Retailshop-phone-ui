import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {environment} from "../environments/environment";
import {ApiConfiguration} from "./modules/retail-api/generated/api-configuration";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpAuthInterceptor} from "./interceptors/http-auth-interceptor";
import { LoginComponent } from './login/login.component';
import {MenuModule} from "primeng/menu";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AvatarModule} from "ngx-avatar";
import {TableModule} from "primeng/table";
import {EllipsifyDirective} from "./directives/ellipsify/ellipsify.directive";
import {SharedTableComponent} from "./shared-table/shared-table.component";
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputTextModule} from "primeng/inputtext";

export function initApiConfiguration(config: ApiConfiguration): Function {
  return () => {
    config.rootUrl = environment.apiBaseUrl;  // eg  'https://some-root-url.com'
  };
}

export const INIT_MEDIA_TRANSCODE_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApiConfiguration,
  deps: [ApiConfiguration],
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EllipsifyDirective,
    SharedTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
      ReactiveFormsModule,
      FormsModule,
    AvatarModule,
    MenuModule,
    TableModule,
    DialogModule,
    ButtonModule,
      ToastModule,
      InputTextModule,
      MenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    },
      MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
