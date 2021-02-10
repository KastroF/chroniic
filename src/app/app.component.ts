import { Component } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { GlobalFooService } from 'src/services/events.service';
import { UserService } from 'src/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  menuItems = [
    {
      name: "Accueil", 
      icon: 'home', 
      root: 'dashboard'
    }, 
    {
      name: 'Mon profil', 
      icon: "person", 
      root: 'profile'
    }, 
    {
      name: "Ma bibliothèque", 
      icon: "book", 
      root: "my-books"
    }, 
    {
      name: 'Mes écrits', 
      icon: "create", 
      root: "created"
    }
  ]; 

  activated = "Accueil";
  id: string; 

  globalFooSubscription: Subscription;
  userSubscription: Subscription; 
  user = {} as User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private navCtrl: NavController, 
    private menuCtrl: MenuController, 
    private globalFooService: GlobalFooService, 
    private userService: UserService, 
    private authService: AuthService, 
    private loadingService: LoadingService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     // firebase.default.initializeApp(config);

     this.globalFooService.getObservable().subscribe((data)=>{

      console.log(data);

      if(data.id){

          this.id  = data.id;
      }

      if(data.go){

          this.activated = "Accueil";
      }
      
    })

     firebase.default.auth().onAuthStateChanged((user)=>{

 /*

     if(user){

      console.log(user.email);

      this.userSubscription = this.userService.users$.subscribe((data)=>{

       

          var id; 
          for(let us of data){

              if(us.email == user.email){

                  this.user = us; 
                  this.user.lastName = this.user.lastName.toUpperCase();
                  this.id = us.id;

              }
          }

          console.log(this.user);
     
          this.navCtrl.navigateRoot(['dashboard/'+this.user.id]).then(()=>{
    
            this.userSubscription.unsubscribe(); 
    
          })
      })



      this.userService.emitUsers();
     

     }else{

      
        this.globalFooService.publishSomeData({
            checked: true
        })

     }*/

     })

    });

    

  }

  write(){

    this.activated =  "";
      this.menuCtrl.close().then(()=>{

          this.navCtrl.navigateRoot(['write']);
      })
  }

  next(item: any){

    this.loadingService.present();

      this.menuCtrl.close();
      this.activated = item.name;
      this.navCtrl.navigateRoot([item.root+'/'+this.id]).then(()=>{

          setTimeout(()=>{

            this.loadingService.dismiss();
          }, 6000)
      })

  }

  logOut(){

    this.userSubscription.unsubscribe(); 
    this.globalFooService.publishSomeData({
      logout: true
    })

    this.menuCtrl.enable(false);
      this.authService.signOut();
      

  }
}
