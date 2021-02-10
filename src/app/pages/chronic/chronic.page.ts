import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import { Chronic } from 'src/models/chronic.model';
import { ChronicService } from 'src/services/chronic.service';
import { LoadingService } from 'src/services/loading.service';
import { CropImagePage } from '../crop-image/crop-image.page';


import * as firebase from 'firebase';
import { AuthService } from 'src/services/auth.service';
import { GlobalFooService } from 'src/services/events.service';

@Component({
  selector: 'app-chronic',
  templateUrl: './chronic.page.html',
  styleUrls: ['./chronic.page.scss'],
})
export class ChronicPage implements OnInit {

  chronic = {} as Chronic;

  errorMessage = '';
  clicked: boolean;
  clicko: boolean;
  photo: any;
  photoss: any; 
  canvas: any; 
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  constructor(private loadingService: LoadingService, private chronicService: ChronicService, 
              private modalController: ModalController, private navCtrl: NavController, 
              private ngxCompressService: NgxImageCompressService, private authService: AuthService, 
              private menuCtrl: MenuController, private gobalFooService: GlobalFooService) {
               
                
              }

  ngOnInit() {
  }


 

  next(){

    this.clicked = true;



    this.errorMessage = "";

    this.loadingService.present();

    if(this.imgResultAfterCompress){


      if(this.chronic.title && this.chronic.title !==""  && this.chronic.description &&  this.chronic.description !== ""){

        
        
        this.chronicService.addChronic(this.chronic).then((data)=>{

          this.chronic.id = data.id;
          this.chronic.date = new Date();

          var str = new Date().toISOString() +data.id+this.authService.makeid(30);

          this.chronic.photo_id = str; 

          const pictures2 = firebase.default.storage().ref('pictures/chronics_coverts/'+str);

          pictures2.putString(this.imgResultAfterCompress, 'data_url').then(()=>{

            this.getImageFromServer(str).then((data2)=>{

                this.chronic.photo = data2; 
                this.chronic.views = 0; 
                this.chronic.user_key = this.authService.user_id;

                this.chronicService.updateChronic(this.chronic).then(()=>{

                    
                    this.navCtrl.navigateForward(['chronic-options/'+data.id]);

                    this.loadingService.dismiss();
                    this.clicked = false;
                })

            })

          })

        })

        

      }else{

        this.loadingService.dismiss();

        this.clicked = false;
          this.errorMessage = "Donnez au moins le titre et une petite description de votre histoire";
      }


    }else{

      this.loadingService.dismiss();
      this.clicked = false; 
      this.errorMessage = "Ajoutez une photo de couverture s'il vous plaît";

    }


  }

  selectImage(){

    this.clicko = true; 

    this.presentModal(CropImagePage);
  }

  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page, 
    });

    modal.onDidDismiss().then((data)=>{  

      this.clicko = false;

        if(data.data){
          console.log(data.data);
          this.photo = data.data;
          
          this.compressFile(this.photo);


         // const ctx = canvas.getContext()
        }
    })

    return await modal.present();
  }





    
dump(obj) {
  var out = '';
  for (var i in obj) {
      out += i + ": " + obj[i] + "\n";
  }

  alert(out);

  // or, if you wanted to avoid alerts...

  var pre = document.createElement('pre');
  pre.innerHTML = out;
  document.body.appendChild(pre)
}



async getImageFromServer(key: string) {

    
  let img;
  let downloadIMG;
  img = firebase.default.storage().ref("pictures/chronics_coverts/" + key).getDownloadURL();
  let ref= firebase.default.storage().ref();
  const imgRef = ref.child("pictures/chronics_coverts/" + key);
  const downloadURL = await imgRef.getDownloadURL()

  return downloadURL             
            
}


compressFile(photo) {

 
  //alert(this.ngxCompressService.byteCount(photo));

    
    this.ngxCompressService.compressFile(photo, null, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        //alert(this.ngxCompressService.byteCount(result));
      }
    );

  
}

}
