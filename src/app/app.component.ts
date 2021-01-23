import { Component } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { GlobalFooService } from 'src/services/events.service';
import { UserService } from 'src/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';

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

  userSubscription: Subscription; 
  user = {} as User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private navCtrl: NavController, 
    private menuCtrl: MenuController, 
    private globalFooService: GlobalFooService, 
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     // firebase.default.initializeApp(config);

      firebase.default.auth().onAuthStateChanged(
        (user) => {

          if (user) {

            console.log(user);
;
            this.userSubscription = this.userService.users$.subscribe((data)=>{

                var users = data; 
                var id; 

                for(let us of users){

                    if(us.email == user.email){

                      id = us.id; 
                      this.id = id;
                      this.user = us;
                      this.user.lastName = this.user.lastName.toUpperCase();
                    }
                }

                this.navCtrl.navigateRoot(['dashboard/'+id]);
            })

            this.userService.emitUsers();

           
          } else {
            
          }
        }, (err)=>{

          console.log(err);
        }
      );
    });

    this.globalFooService.getObservable().subscribe((data) => {
      console.log('Data received', data);
      if(data.id){
        this.id = data.id; 

        this.userSubscription = this.userService.getUser(this.id).subscribe((data)=>{

            this.user = data;
            this.user.lastName = this.user.lastName.toUpperCase();
            console.log(this.user);
        })

      }
      if(data.go){
        this.activated = data.go; 
      }
  });

  }

  next(item: any){

      this.menuCtrl.close();
      this.activated = item.name;
      this.navCtrl.navigateRoot([item.root+'/'+this.id]);

  }
}
