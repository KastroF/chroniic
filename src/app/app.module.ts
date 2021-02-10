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
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { LoadingService } from 'src/services/loading.service';

import { AngularFireModule } from '@angular/fire'; 
import { AngularFireDatabaseModule } from '@angular/fire/database'; 
import { AngularFirestoreModule } from '@angular/fire/firestore'
import {NgxImageCompressService} from 'ngx-image-compress';
import { ChronicService } from 'src/services/chronic.service';
import { CompressImageService } from 'src/services/compress.image.service';
import { CategorieService } from 'src/services/categorie.service';
import { ViewService } from 'src/services/views.service';
import { TextService } from 'src/services/text.service';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ChapterService } from 'src/services/chapter.service';
import { PaymentService } from 'src/services/payments.service';
import { Camera } from '@ionic-native/camera/ngx';
import { CategoriesPageModule } from './pages/categories/categories.module';
import { ContractPageModule } from './pages/contract/contract.module';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'

let config = {

  apiKey: "AIzaSyDHoWx9Nni4qtFPJTYiFjl0Y71qifrZjVc",
  authDomain: "chronickel-5410b.firebaseapp.com",
  databaseURL: "https://chronickel-5410b.firebaseio.com",
  projectId: "chronickel-5410b",
  storageBucket: "chronickel-5410b.appspot.com",
  messagingSenderId: "139277043904",
  appId: "1:139277043904:web:c06d2b3073db1460ee8525",
  measurementId: "G-2GFJKYRC0R"

}

@NgModule({
  declarations: [AppComponent, CguPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
            SignInPageModule, 
            SignUpPageModule, 
            CguPageModule, 
            CategoriesPageModule,
            ContractPageModule,
            AngularFireModule.initializeApp(config), 
            AngularFireDatabaseModule, 
            SlickCarouselModule,
            AngularFirestoreModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    UserService, 
    AuthService, 
    NgxImageCompressService,
    CompressImageService,
    TextService,
    ChronicService,
    CategorieService, 
    ChapterService,
    InAppBrowser,
    ViewService,
    LoadingService, 
    PaymentService, 
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
