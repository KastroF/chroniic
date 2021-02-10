import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-for-him',
  templateUrl: './for-him.page.html',
  styleUrls: ['./for-him.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForHimPage implements OnInit {

  userSubscription: Subscription; 
  users: User[];

  userss: User[];
  finalUsers: User[];

  constructor(private modalCtrl: ModalController, private userService: UserService, 
              private menuCtrl: MenuController) {

    this.menuCtrl.enable(false);
    
   }

  ngOnInit() {

    this.userSubscription = this.userService.users$.subscribe((data)=>{

        this.users = data; 

        for(let u of this.users){

            u.name = u.firstName+" "+u.lastName;
        }

        this.userss = this.users;
    })

    this.userService.emitUsers();
  }

  
  filterJsonData(ev: any){

    const val = ev.target.value; 
    var users: User[] = [];
    this.users = this.userss;
    this.finalUsers = [];

    if(val && val.trim() !== ""){


      this.users = this.users.filter((item)=>{

         

         if(item.name){

          if((item.name.toLocaleLowerCase().indexOf(val.toLowerCase()) > -1) ){

            users.push(item);

          }
          
         
         }

          
         this.finalUsers = users;
      })



    }          

    
  }

  dismissModal(){

      this.modalCtrl.dismiss();
  }

}
