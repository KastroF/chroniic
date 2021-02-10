import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/models/chapter.model';
import { Chronic } from 'src/models/chronic.model';
import { ChapterService } from 'src/services/chapter.service';
import { ChronicService } from 'src/services/chronic.service';
import { LoadingService } from 'src/services/loading.service';
import { ContractPage } from '../contract/contract.page';

@Component({
  selector: 'app-chapter-options',
  templateUrl: './chapter-options.page.html',
  styleUrls: ['./chapter-options.page.scss'],
})
export class ChapterOptionsPage implements OnInit {

  chapter = {} as Chapter;
  view: boolean;
  com: boolean;
  errorMessage: string;

  chronicSubscription: Subscription; 
  chronic = {} as  Chronic;
  constructor(private alertController: AlertController, 
              private toastController: ToastController, 
              private modalController: ModalController, 
              private chapterService: ChapterService, 
              private chronicService: ChronicService, 
              private navCtrl: NavController, 
              private loadingService: LoadingService) {

               }

  ngOnInit() {

  }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Publication effectuée avec succès.',
      duration: 2000
    });
    toast.present();
  }


  contract(){

      this.presentModal(ContractPage);
  }

  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page, 
    });


    return await modal.present();
  }
  

  buy(){

    if(this.chapter.buy == true){

      this.view = true; 

    }else{

      this.view = false; 

      this.chapter.price = null;
    }
  }

  async presentAlertConfirm() {

    const alert = await this.alertController.create({
      header: "Prix du chapitre",
      message: '<strong>Vous devez donnez un prix à ce chapitre</strong>!!!',
      buttons: [
       {
          text: 'Okay',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  publish(){

     

      if(this.chapter.buy && !this.chapter.price){

      
        this.presentAlertConfirm(); 
  
      }else{
  
        this.updateChapter();
      }
  }

  updateChapter(){

    this.loadingService.present();
    
    this.com = true;

      if(this.chapter.price && this.chapter.price >=100 && this.chapter.price <=100000){

        this.chapter.date = new Date();
        this.chapter.reading = 0; 
        this.chapter.p_active = true; 

        this.chapterService.updateChapter(this.chapter).then(()=>{

            this.chronicSubscription = this.chronicService.getChronic(this.chapter.ch_key).subscribe((data)=>{

              this.chronic = data; 
             

              if(!this.chronic.active){

                this.chronic.date = new Date(); 
                this.chronic.active = true; 
                this.chronicService.updateChronic(this.chronic).then(()=>{

                  
                })


              }else{

                this.presentToast();
                    this.navCtrl.navigateRoot(['dashboard']).then(()=>{

                    

                        this.loadingService.dismiss();
                    })

                  
              }

             

            })
        })


      }else{

        this.com = false;

          this.errorMessage = "Le prix minimum d'une chronique est de 100 FCFA, et ne peut"+
          "exceder 100 000 FCFA";
      }
  }


}
