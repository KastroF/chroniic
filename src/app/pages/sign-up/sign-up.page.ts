
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { GlobalFooService } from 'src/services/events.service';
import { LoadingService } from 'src/services/loading.service';
import { UserService } from 'src/services/user.service';
import { CguPage } from '../cgu/cgu.page';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

 users : User[];

 errorMessage = "";
  isActiveToggleTextPassword: boolean = true;

  user = {} as User; 
  userSubscription: Subscription; 

  constructor(private modalController: ModalController, private userService: UserService, 
              private authService: AuthService, private loadingService: LoadingService, 
              private navCtrl: NavController, private globalFooService: GlobalFooService, 
              private menuCtrl: MenuController) { 

                this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.userSubscription = this.userService.users$.subscribe(
      (users: User[])=>{

        this.users = users; 

        console.log(this.users);

      }
    )

    this.userService.emitUsers();


  }

  ngOnDestroy(){

    this.userSubscription.unsubscribe();
  }

  close(){

    this.modalController.dismiss();
  }


  onSubmitForm(form: NgForm) {

    this.loadingService.present();

    this.errorMessage = "";


    if(form.value.firstName){

      var firstName = form.value.firstName.trim();
    }

    if(form.value.lastName){

      var lastName = form.value.lastName.trim(); 
    }
     
    if(form.value.email){
      var email = form.value.email.trim();
    }

    if(form.value.pass){

      var pass = form.value.pass.trim();

    }
     
    

    if(lastName && email && pass){

      console.log(this.user);

      this.authService.signUpUser(email, pass).then(()=>{

        

        this.user.date = new Date();

        this.userService.addUser(this.user).then((data)=>{

          this.modalController.dismiss();

          this.globalFooService.publishSomeData({
            id: data.id, 
            connect: true
        });
          this.navCtrl.navigateRoot(['dashboard/'+data.id]);
        })


        this.loadingService.dismiss();

        

        

      }, (err)=>{

          console.log(err);

          if(err.message == "The email address is badly formatted."){

              this.errorMessage="Format d'email invalide"
              
              this.loadingService.dismiss();

          }

          if(err.message ="Password should be at least 6 characters"){

            this.errorMessage = "Mot de passe trop court (Minimum 6 caractères)";
            
            this.loadingService.dismiss();
          }

          if(err.message == "The email address is already in use by another account."){

              this.errorMessage = "Adresse Email déjà utilisée";
              this.loadingService.dismiss();
          }

          if(err.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred."){

            this.errorMessage = "Problème de connexion internet";
            this.loadingService.dismiss();
          }
      })


    }else{

      this.errorMessage = "Veuillez remplir les champs obligatoires";
      this.loadingService.dismiss();

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
