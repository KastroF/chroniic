import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Chronic } from 'src/models/chronic.model';
import { ChronicService } from 'src/services/chronic.service';
import { LoadingService } from 'src/services/loading.service';
import * as firebase from 'firebase';
import { CategoriesPage } from '../categories/categories.page';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-chronic-options',
  templateUrl: './chronic-options.page.html',
  styleUrls: ['./chronic-options.page.scss'],
})
export class ChronicOptionsPage implements OnInit {

  chronic = {} as Chronic;
  go:boolean; 

  photo: any;
  view: boolean;

  chronicSubscription: Subscription; 

  clicked: boolean; 
  errorMessage: string;

  constructor(private modalController: ModalController, private activatedRoute: ActivatedRoute, 
              private chronicService: ChronicService, private alertController: AlertController,
              private navCtrl: NavController, private loadingCtrl: LoadingService, 
              private camera: Camera, private ngxCompressService: NgxImageCompressService, 
              private authService: AuthService, private menuCtrl: MenuController) { 

         
              }

  ngOnInit() {

    this.chronic.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.chronicSubscription = this.chronicService.getChronic(this.chronic.id).subscribe((data)=>{

        this.chronic = data;

    })

  }

  buy(){

    if(this.chronic.buy == true){

      this.view = true; 

    }else{

      this.view = false; 
      this.chronic.price = null;
    }
  }


  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page
    
    });


   modal.onDidDismiss().then((data)=>{

      this.chronic.categories = [];

      if(data.data){

        this.go = true;

        for(let c of data.data){

          this.chronic.categories.push(c);
            
        }
      }else{

        this.go = false;
      }

   })


    return await modal.present();
  }

  async getImageFromServer(key: string) {

    
    let img;
    let downloadIMG;
    img = firebase.default.storage().ref("pictures/chronics_coverts_name/" + key).getDownloadURL();
    let ref= firebase.default.storage().ref();
    const imgRef = ref.child("pictures/chronics_coverts_name/" + key);
    const downloadURL = await imgRef.getDownloadURL()

    return downloadURL

                
              
  }
  async selectImage(){

    this.loadingCtrl.present();

    this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
  
   
  pickImage(sourceType) {

  

    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE, 
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      
      
      this.photo = 'data:image/jpeg;base64,'+imageData;

      this.compressFile(this.photo);

    }, (err)=>{

      })

      this.loadingCtrl.dismiss(); 
    }

  goToC(){
    this.presentModal(CategoriesPage);
  }

  compressFile(photo) {

  
      
      this.ngxCompressService.compressFile(photo, null, 50, 50).then(
        result => {
          this.photo = result;

          this.loadingCtrl.dismiss();
         
        }
      );
  
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Prix de la chronique",
      message: '<strong>Vous n\'avez pas pas donner de prix. Continuez??? </strong>!!!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            
            this.updateChronic();

          }
        }
      ]
    });

    await alert.present();
  }

  next(){

    if(this.chronic.buy && !this.chronic.price){

      this.presentAlertConfirm()

    }else{

      this.updateChronic();
     
    }

  }

  updateChronic(){

    this.clicked = true;

    if(this.chronic.price){

      if(this.chronic.price >= 100 && this.chronic.price <=100000){


        
    if(this.photo){

      this.chronic.covert = this.photo;

      var str = new Date().toISOString()+this.authService.user_id+this.authService.makeid(30);
  
      const pictures2 = firebase.default.storage().ref('pictures/chronics_coverts_name/'+str);

      pictures2.putString(this.chronic.covert, 'data_url').then(()=>{

          this.getImageFromServer(str).then((url)=>{

            this.chronic.covert = url;

            this.chronicService.updateChronic(this.chronic).then(()=>{

              this.navCtrl.navigateForward(['chapter/'+this.chronic.id]).then(()=>{
    
                  this.clicked = false;
              })
          })


          })
      })


    }else{

      this.chronicService.updateChronic(this.chronic).then(()=>{

          this.navCtrl.navigateForward(['chapter/'+this.chronic.id]).then(()=>{

              this.clicked = false;
          })
      })

    }


      }else{

          this.errorMessage = "Le prix minimum d'une chronique est de 100 FCFA, et ne peut"+
          "exceder 100 000 FCFA";
      }


    }else{

      
    if(this.photo){

      this.chronic.covert = this.photo;

      var str = new Date().toISOString()+this.authService.user_id+this.authService.makeid(30);
  
      const pictures2 = firebase.default.storage().ref('pictures/chronics_coverts_name/'+str);

      pictures2.putString(this.chronic.covert, 'data_url').then(()=>{

          this.getImageFromServer(str).then((url)=>{

            this.chronic.covert = url;

            this.chronicService.updateChronic(this.chronic).then(()=>{

              this.navCtrl.navigateForward(['chapter/'+this.chronic.id]).then(()=>{
    
                  this.clicked = false;
              })
          })


          })
      })


    }else{

      this.chronicService.updateChronic(this.chronic).then(()=>{

          this.navCtrl.navigateForward(['chapter/'+this.chronic.id]).then(()=>{

              this.clicked = false;
          })
      })

    }


    }


  }


}
