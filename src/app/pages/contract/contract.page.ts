import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})
export class ContractPage implements OnInit {

  userSubscription: Subscription; 
  users: User[]; 

  user = {} as User; 
  constructor(private modalController: ModalController, private authService: AuthService, 
              private userService: UserService, private menuCtrl: MenuController) { 

                this.menuCtrl.enable(false);
                this.menuCtrl.enable(false,"first");
              }

  ngOnInit() {

    this.userSubscription = this.userService.getUser(this.authService.user_id).subscribe((data)=>{

      this.user = data; 

    })
  }


  dismissModal(){

      this.modalController.dismiss()
  }

}
