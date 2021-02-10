import { Injectable } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';



@Injectable()
export class AuthService {





  isAuth = false;

  user_id: string;
  
  
  constructor(private navCtrl: NavController, private menuCtrl: MenuController) {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  resetPass(email: string){

    return new Promise((resolve, reject)=>{

     firebase.default.auth().sendPasswordResetEmail(email).then(()=>{

       resolve(true); 
     }, (error)=>{

       reject(error);
     })

    })
   }

  signUpUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });

}

signOut() {

    firebase.default.auth().signOut().then(()=>{

      this.menuCtrl.close();
      this.navCtrl.navigateRoot(['']);  


    }, (err)=>{

        console.log(err);
    })
}

}