import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper'
import { CropImageService } from 'src/services/crop.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { MenuController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/services/loading.service';
import { GlobalFooService } from 'src/services/events.service';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.page.html',
  styleUrls: ['./crop-image.page.scss'],
})
export class CropImagePage implements OnInit {

  @ViewChild(ImageCropperComponent, {static: false})angularCropper: ImageCropperComponent;

  myImage = null; 
  croppedImage = null; 

  constructor(private cropImageService: CropImageService, private camera: Camera, 
              private modalController: ModalController, private loadingService: LoadingService, 
              private menuCtrl: MenuController, private globalFooService: GlobalFooService) {

                this.menuCtrl.enable(false);
                this.menuCtrl.enable(false,"first");

               }

  ngOnInit() {
  }

  captureImage(){

    this.loadingService.present();

    this.cropImageService.convertFileToDataURLviaFileReader('../../../assets/image/OIW3930-min.jpg').subscribe(
      base64=>{

        this.myImage = base64;




      }, (err)=>{

        this.loadingService.dismiss();
      })
    
      //this.convertFileToDataURLviaFileReader('../../../assets/image/OIW3930-min.jpg')


      const options: CameraOptions = {
        quality: 100, 
        destinationType: this.camera.DestinationType.DATA_URL, 
        encodingType: this.camera.EncodingType.JPEG, 
        mediaType: this.camera.MediaType.PICTURE, 
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, 
        correctOrientation: true
      }

      this.camera.getPicture(options).then((imageData)=>{

        this.myImage = 'data:image/jpeg;base64,'+imageData;
        this.loadingService.dismiss();

      }, (err)=>{

        this.loadingService.dismiss();
    })
  }

  clear(){
    this.angularCropper.imageBase64 = null; 
    this.myImage = null; 
    this.croppedImage = null; 
  }

  save(){

    this.loadingService.present();
    this.angularCropper.crop();

    if(this.croppedImage){
      this.modalController.dismiss(this.croppedImage).then(()=>{
          this.loadingService.dismiss();
          this.globalFooService.publishSomeData({
            closeCrop: true
        })
      })
    }
  }
  
  dismissModal(){
    this.modalController.dismiss().then(()=>{

        this.globalFooService.publishSomeData({
            closeCrop: true
        })
    })
  }
  imageCropped(event: ImageCroppedEvent){

    this.croppedImage = event.base64;

  }

  move(x, y){
    this.angularCropper.cropper.x1 +=x; 
    this.angularCropper.cropper.x2 +=x; 
    this.angularCropper.cropper.y1 +=y; 
    this.angularCropper.cropper.y2 +=y;
  } 

}
