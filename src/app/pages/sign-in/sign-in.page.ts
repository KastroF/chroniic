import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { GlobalFooService } from 'src/services/events.service';
import { LoadingService } from 'src/services/loading.service';
import { UserService } from 'src/services/user.service';
import { ChangePassPage } from '../change-pass/change-pass.page';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  errorMessage = '';
  user = {} as User;
  email: string = "";
  clicked: boolean;
  validated: boolean; 
  
  users : User[]; 
  userSubscription: Subscription; 

  constructor(private modalController: ModalController, private alertCtrl: AlertController,
              private authService: AuthService, private loadingService: LoadingService, 
              private navCtrl: NavController, private userService: UserService, 
              private globalFooService: GlobalFooService, private menuCtrl: MenuController) {

                this.menuCtrl.enable(false);
               }

  ngOnInit() {

    this.userSubscription = this.userService.users$.subscribe((users: User[])=>{

        this.users = users; 
    })

    this.userService.emitUsers();

  }

  close(){

    this.modalController.dismiss();
  }


  async presentModal(page: any){

     const modal= await this.modalController.create({

        component: page
      })

      modal.onDidDismiss().then(()=>{

          this.clicked = false;
      })

      return await  modal.present();
  }

  onSubmitForm(form: NgForm){

    this.validated = true;

    this.loadingService.present();

    console.log(form.value);

    if(form.value.email){

      var email = form.value.email; 

    }

    if(form.value.pass){

      var pass = form.value.pass; 
      
    }


    if(email && pass){

      this.authService.signInUser(email, pass).then(()=>{

        var u = {} as User; 

        for(let user of this.users){

            if(user.email == email){

              u = user; 

            }
        }

        this.modalController.dismiss().then(()=>{

          this.globalFooService.publishSomeData({
            id: u.id, 
            connect: true
        });

          this.navCtrl.navigateRoot(['dashboard/'+u.id]).then(()=>{


          }, (err)=>{

            console.log(err);
          })

        })
       

        this.loadingService.dismiss();

      }, (err)=>{

        this.loadingService.dismiss();

          console.log(err);

          this.validated = false;

          if(err.message == "The email address is badly formatted."){

            this.errorMessage = "Format d'adresse email ivalide";
          }

          if(err.message == "There is no user record corresponding to this identifier. The user may have"+ 
          "been deleted."){

            this.errorMessage = 'Adresse Email introuvable';
          }

          if(err.message == "The password is invalid or the user does not have a password."){

              this.errorMessage = "Mot de passe incorrect";
          }

          if(err.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred."){

            this.errorMessage = "Problème de connexion internet";
           
          }
      })

    }else{

      this.loadingService.dismiss();

        this.errorMessage = 'Veuillez remplir tous les champs';
        this.validated = false;
    }


  }

  resetPass(){

    this.presentModal(ChangePassPage);
    this.clicked = true;

  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      cssClass: 'clas',
      header: 'Mot de passe oublié',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Entrez votre Email'
        },
  
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Valider',
          handler: (data) => {
            console.log(data.email);
          }
        }
      ]
    });

    await alert.present();
  }

}
