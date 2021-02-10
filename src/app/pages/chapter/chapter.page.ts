import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/models/chapter.model';
import { ChapterService } from 'src/services/chapter.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxImageCompressService } from 'ngx-image-compress';
import * as firebase from 'firebase';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { CropImagePage } from '../crop-image/crop-image.page';
import { AuthService } from 'src/services/auth.service';
import { LoadingService } from 'src/services/loading.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {

  chapter = {} as Chapter;

  chapterSubscription: Subscription;
  chapters: Chapter[];

  count: number;
  finalChapters: Chapter[];
  clicko: boolean;
  Editor = ClassicEditor;
  clicked: Boolean;
  imgResultAfterCompress: string;
  photo: string;
  errorMessage: string;

  

  constructor(private activatedRoute: ActivatedRoute, private chapterService: ChapterService, 
              private ngxCompressService: NgxImageCompressService, private authService: AuthService,
              private modalController: ModalController, private navCtrl: NavController, 
              private loadingService: LoadingService, private menuCtrl: MenuController) { 

              }

  ngOnInit() {

    this.Editor.create( document.querySelector( '#editor' ), {
     
    } )
    .then( editor => {
        console.log( editor );
        editor.ui.view.editable.element.style.height = '250px'
    } )
    .catch( error => {
        console.error( error );
    } );

    this.chapter.ch_key = this.activatedRoute.snapshot.paramMap.get('id');

    this.chapterSubscription = this.chapterService.chapters$.subscribe((data)=>{

      this.count = 0;
      this.finalChapters = [];
        this.chapters = data; 

        for(let ch of this.chapters){

          if(ch.p_active && ch.ch_key == this.chapter.ch_key){

              this.finalChapters.push(ch);
          }

        }

        this.count = this.finalChapters.length+1;
    })

    this.chapterService.emitChapters();

  }

  ngOnDestroy(){

    this.chapterSubscription.unsubscribe();
  }

  next(){

 

      this.clicked = true;
      this.errorMessage = "";
      this.loadingService.present();
      this.chapter.date = new Date();

      if(this.chapter.title && this.chapter.title !=="" && this.chapter.content && this.chapter.content !==""){

        if(this.imgResultAfterCompress){

          this.chapter.photo = this.photo; 

            var str = new Date().toISOString()+this.authService.user_id+this.authService.makeid(30); 
            this.chapter.photo_id = str;         
              const pictures3 = firebase.default.storage().ref('pictures/chapter_coverts/'+str);
      
              pictures3.putString(this.chapter.photo, 'data_url').then(()=>{

                  this.getImageFromServer(str).then((url)=>{

                      this.chapter.photo =  url; 

                      this.chapterService.addChapter(this.chapter).then((data)=>{

                        this.navCtrl.navigateForward(['chapter-options/'+data.id]).then(()=>{

                          this.clicked = false;
                          this.loadingService.dismiss();
                        })

                      })
                  })
              })

        }else{

          this.chapterService.addChapter(this.chapter).then((data)=>{

            this.navCtrl.navigateForward(['chapter-options/'+data.id]).then(()=>{

              this.clicked = false;
              this.loadingService.dismiss();
            })

          })

        }

      }else{

          this.clicked = false;
        
          this.loadingService.dismiss();
          this.errorMessage = "Veuillez donner un titre et au moins écrire quelques mots s'il vous"+ 
          "plaît";
      }
  }

  onChange({editor}: ChangeEvent){

    alert('go');

    console.log(editor.getData());


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

 


    
    this.ngxCompressService.compressFile(photo, null, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
       // alert(this.ngxCompressService.byteCount(result));
      }
    );

  
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


}
