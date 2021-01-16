
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/models/user.model';
import { CguPage } from '../cgu/cgu.page';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  users = [
    {
    firstName: 'Fidèle', 
    lastName: 'NDZIME', 
    email: 'nkastrro@gmail.com', 
    pass: 'fidele'
    }, 
    {
      firstName: 'Kas', 
      lastName: 'TROP', 
      email: 'test@gmail.com', 
      pass: 'fidele'
      }
]

  isActiveToggleTextPassword: boolean = true;

  user = {} as User; 

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(){

    this.modalController.dismiss();
  }


  onSubmitForm(form: NgForm) {
    console.log(form.value);
    this.modalController.dismiss();

    var us; 
    var c = 0; 

    for(let u of this.users){

        if(u.email.toLowerCase() == form.value.email.toLowerCase()){

            us = u; 
            c++; 
        }
    }

    if(c==0){

      console.log('Not ok');

    }else{

        if(us.pass.toLowerCase() == form.value.pass.toLowerCase()){

            console.log('ok');
        }else{

            console.log('Pass Not Ok')
        }
    }
}



  
  toggleTextPassword(): void{
    
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
}
public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
}

async presentModal(page) {
  const modal = await this.modalController.create({
    component: page
  
  });


 


  return await modal.present();
}

cgu(){

    this.presentModal(CguPage);
}

}
