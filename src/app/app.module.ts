import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignInPageModule } from './pages/sign-in/sign-in.module';
import { SignUpPageModule } from './pages/sign-up/sign-up.module';
import { CguPipe } from './pages/cgu.pipe';
import { CguPageModule } from './pages/cgu/cgu.module';

@NgModule({
  declarations: [AppComponent, CguPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
            SignInPageModule, 
            SignUpPageModule, 
            CguPageModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
