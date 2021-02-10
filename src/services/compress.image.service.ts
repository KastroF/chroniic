import { Component, Injectable, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';


@Injectable()
export class CompressImageService{

    constructor(private imageCompress: NgxImageCompressService) { }


file: any;
localUrl: any;
localCompressedURl:any;
sizeOfOriginalImage:number;
sizeOFCompressedImage:number;

selectFile(photo, text) {
var  fileName = text;
this.file = photo;
if (photo && text) {
var reader = new FileReader();
reader.onload = (event: any) => {
this.localUrl = event.target.result;
this.compressFile(this.localUrl,fileName)
}
reader.readAsDataURL(photo);
}
}
imgResultBeforeCompress:string;
imgResultAfterCompress:string;




compressFile(image,fileName) {
var orientation = -1;
this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
this.imageCompress.compressFile(image, orientation, 50, 50).then(
result => {
this.imgResultAfterCompress = result;
this.localCompressedURl = result;
this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
// create file from byte
const imageName = fileName;
// call method that creates a blob from dataUri
//const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
//imageFile created below is the new compressed file which can be send to API in form data
//const imageFile = new File([result], imageName, { type: 'image/jpeg' });

return result; 

});




}


dataURItoBlob(dataURI) {
const byteString = window.atob(dataURI);
const arrayBuffer = new ArrayBuffer(byteString.length);
const int8Array = new Uint8Array(arrayBuffer);
for (let i = 0; i < byteString.length; i++) {
int8Array[i] = byteString.charCodeAt(i);
}
const blob = new Blob([int8Array], { type: 'image/jpeg' });
return blob;
}


}