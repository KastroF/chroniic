import * as firebase from 'firebase';

export class AuthService {

  isAuth = false;

  user_id: string; 
  constructor() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
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
    firebase.default.auth().signOut();
}

}