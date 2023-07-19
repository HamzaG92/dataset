import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { AppHeaderComponent } from './shared/app-header/app-header.component';

import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DatasetService } from './shared/services/dataset.service';
import { DatasetContainerComponent } from './features/dataset/dataset-container/dataset-container.component';
import { AuthService } from './shared/auth/auth.service';
import { authConfig } from './shared/auth/auth.config';
import { AuthGuard } from './shared/auth/auth.guard';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent],
  imports: [
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081', 'https://mma.oxymel.com:8081'],
        sendAccessToken: true,
      },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [DatasetService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
