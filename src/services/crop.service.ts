import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CropImageService{


    cropObs: Observable<any[]>; 

    convertFileToDataURLviaFileReader(url: string){
        this.cropObs =  Observable.create(observer=>{
    
          let xhr: XMLHttpRequest = new XMLHttpRequest(); 
          xhr.onload = function(){
    
            let reader: FileReader = new FileReader(); 
            reader.onloadend = function(){
    
              observer.next(reader.result); 
              observer.complete(); 
    
            }; 
            reader.readAsDataURL(xhr.response);
          }; 
          xhr.open('GET', url); 
          xhr.responseType = 'blob'; 
          xhr.send();
        });

        return this.cropObs;
      }

      

}