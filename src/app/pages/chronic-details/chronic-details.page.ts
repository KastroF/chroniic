import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chronic } from 'src/models/chronic.model';
import { AuthService } from 'src/services/auth.service';
import { ChronicService } from 'src/services/chronic.service';

import * as $ from 'jquery';

import * as slick from "slick-carousel";
import { ActionSheetController, IonSlides, MenuController, ModalController } from '@ionic/angular';
import { Chapter } from 'src/models/chapter.model';
import { ChapterService } from 'src/services/chapter.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { PaymentService } from 'src/services/payments.service';
import { Payment } from 'src/models/payment.model';
import { LoadingService } from 'src/services/loading.service';
import { ForHimPage } from '../for-him/for-him.page';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { GlobalFooService } from 'src/services/events.service';


@Component({
  selector: 'app-chronic-details',
  templateUrl: './chronic-details.page.html',
  styleUrls: ['./chronic-details.page.scss'],
})
export class ChronicDetailsPage implements OnInit {


  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;


  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  options: any; 
  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 2,
    loop: false,
    centeredSlides: true,
    spaceBetween: 70
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };

  many: boolean; 

  id: string;
  user_id: string;  

  chronic = {} as Chronic; 
  chronicSubscription: Subscription; 

  chronicSubscription2: Subscription; 
  chronics: Chronic[];

  chapterSubscription: Subscription; 
  chapters: Chapter[];

  finalChronics : Chronic[] = [];
  yesOhhh: boolean; 

  finalChapters : Chapter[] = [];
  count: number;

 
  selectedSlide: any; 
  segment = 0;
  slidesOptions = {
      initialSlide: 0, 
      slidesPreview: 1, 
      speed: 1000

  }; 
  userSubscription: Subscription; 
  users: User[];

  paymentSubscription: Subscription;
  payments: Payment[];

  author: string;

  auth_id: string; 

  optionss : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'no',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'no',//Windows only    
};

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, 
              private chronicService: ChronicService, private chapterService: ChapterService, 
              private userService: UserService, private paymentService: PaymentService, 
              private loadingService: LoadingService, private modalController: ModalController,
              private actionSheetController: ActionSheetController, 
              private lab: InAppBrowser, private menuCtrl: MenuController, 
              private globalFooService: GlobalFooService) {




                this.loadingService.present(); 

                setTimeout(()=>{

                    this.loadingService.dismiss();
                }, 8000)

   }


   backButton(){

      this.globalFooService.publishSomeData({

          goToDash: true
      })
   }


   slideDidChange(slides: IonSlides){

    this.selectedSlide = slides; 

    slides.getActiveIndex().then((selectedSlide)=>{

        this.segment = selectedSlide;

        this.chronic = this.finalChronics[this.segment];


        this.chapterService.emitChapters();
      

        console.log(this.segment);
    })

   }

   slideChanged(slides: IonSlides){

      
      

   }

  ngOnInit() {

   

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user_id = this.authService.user_id; 


    this.chronicSubscription = this.chronicService.getChronic(this.id).subscribe((data)=>{

        this.chronic = data; 
        this.chronic.title = this.chronic.title.toUpperCase();
        this.finalChronics[1] = this.chronic;

        console.log(this.chronic);

        this.paymentSubscription = this.paymentService.payments$.subscribe((data7)=>{

          this.payments = data7; 

          var i = 0;

          for(let payment of this.payments){

              if(payment.ch_key == this.id && payment.user_key == this.user_id){

                  i++;
              }
          }

          if(i != 0){

              this.chronic.buy = true;
          }




        })

        this.userSubscription = this.userService.users$.subscribe((data4)=>{

            this.users = data4; 

            for(let user of this.users){

                if(this.chronic.user_key == user.id){

                    this.author = user.firstName +" "+ user.lastName.toUpperCase();
                }
            }
        })

        this.chapterSubscription = this.chapterService.chapters$.subscribe((data3)=>{

          this.finalChapters = [];
            this.chapters = data3; 
       
            this.chronic.likes = 0;

            for(let chapt of this.chapters){

                if(chapt.ch_key == this.chronic.id){

                    this.finalChapters.push(chapt);

                    if(chapt.likes){

                      this.chronic.likes += chapt.likes;
                    }
                }
            }

            this.chronic.howManyChapts = this.finalChapters.length;

          })
        this.chronicSubscription2 = this.chronicService.chronics$.subscribe((data2)=>{

            this.chronics = data2; 

      

            var i = 1; 

            this.finalChronics[0] = this.chronic;

            for(let c of this.chronics){

              if(c.active && c.user_key == this.chronic.user_key && c.id !==this.id){

                  c.title = c.title.toUpperCase();
                  this.finalChronics[i] = c;
                  

                i++;  
              }

            

            }

            if(i > 1){

                

                this.options = this.slideOptsTwo; 
                console.log('After');
              

            }else{
                
                this.options = this.slideOptsOne;
                this.finalChronics = []; 
                this.finalChronics[0] = this.chronic;

                console.log('One');

            }


            console.log(this.finalChronics);

        })

    })




    this.chronicService.emitChronics(1);
    this.chapterService.emitChapters();
    this.userService.emitUsers();
  }


  ngOnDestroy(){

      this.chronicSubscription.unsubscribe(); 
      this.chronicSubscription2.unsubscribe();

      


  }



  ngAfterViewInit(){

    $(document).ready(function(){

      this.yesOhhh = true;
     
      
    })

  }

  
  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page
    
    });

    
   modal.onDidDismiss().then(()=>{

    
 })


  return await modal.present();
}

  async verify(){

    const actionSheet = await this.actionSheetController.create({
      header: "Débloquer tous les chapitres payants",
      cssClass: 'color radius', 
      buttons: [{
        text: 'Pour qui voulez-vous payer ?',

      },
      {
        text: 'Pour moi-même',
        cssClass: 'colorrr', 
        handler: () => {

      
          this.lab.create('https://jamibot.com', '_self', this.optionss);
        }
      },
      {
        text: "Pour quelqu'un d'autre",
        cssClass: 'colorrr', 
        handler: () => {

          this.presentModal(ForHimPage);
         
        }
      },
      {
        text: 'Annuler',
        cssClass:'colorr', 
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


}
