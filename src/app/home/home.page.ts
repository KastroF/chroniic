import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { GlobalFooService } from 'src/services/events.service';
import { LoadingService } from 'src/services/loading.service';
import { SignInPage } from '../pages/sign-in/sign-in.page';
import { SignUpPage } from '../pages/sign-up/sign-up.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  clicked: boolean; 


  constructor(private modalController: ModalController, private menuCtrl: MenuController,
              private globalFooService: GlobalFooService, private loadingService: LoadingService) {
                this.menuCtrl.enable(false);
                this.menuCtrl.enable(false,"first");
  
               this.globalFooService.publishSomeData({
                  home: true
               }); 

               this.loadingService.present(); 

               setTimeout(()=>{

                  this.loadingService.dismiss();
               }, 7000)

               this.globalFooService.getObservable().subscribe((data)=>{

                  if(data.checked){

                     setTimeout(()=>{

                      this.clicked = false;

                       console.log(this.clicked);

                     }, 6000)

                  }
               })
  }

  ngOnInit(){

 
  }

  
  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page
    
    });


   modal.onDidDismiss().then(()=>{

      this.clicked = false;
   })


    return await modal.present();
  }

  signUp(){


    this.clicked = true; 
        this.presentModal(SignUpPage); 
  }

  signIn(){

    this.clicked = true; 
      this.presentModal(SignInPage);
  }

}
