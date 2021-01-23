import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(public loadingController: LoadingController, private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 30000,
      message: 'Chargement en cours, veuillez patienter...'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => {
            
          });
        }
      });
    });
  }

  async present2() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 75000,
      message: 'Paiement en cours, cela peut prendre jusqu\' à une minute...'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => {
            
          });
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}