import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInPage } from '../pages/sign-in/sign-in.page';
import { SignUpPage } from '../pages/sign-up/sign-up.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}


  
  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page
    
    });


   


    return await modal.present();
  }

  signUp(){

        this.presentModal(SignUpPage); 
  }

  signIn(){

      this.presentModal(SignInPage);
  }

}
