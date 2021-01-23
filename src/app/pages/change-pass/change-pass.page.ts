import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

import * as firebase from 'firebase';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  errorMessage = "";

  constructor(private modalCtrl: ModalController, private toastController: ToastController, 
              private authService: AuthService) { }

  ngOnInit() {


  }

  close(){

      this.modalCtrl.dismiss();
  }

  onSubmitForm(form: NgForm){

    if(form.value.email){

        var email = form.value.email; 

        this.authService.resetPass(email).then(()=>{

            this.presentToast("Un mail a été envoyé à cette adresse électronique", 'bottom', 3000);
            this.modalCtrl.dismiss();

        }, (err)=>{

            console.log(err);

            if(err.message == "The email address is badly formatted."){

              this.errorMessage="Format d'adresse Email invalide";

            }

            if("There is no user record corresponding to this identifier. The user may have been deleted."){

                this.errorMessage = "Email introuvable";
            }
        })
    
    }
  }

 
  

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }


}
