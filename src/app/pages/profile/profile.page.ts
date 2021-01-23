import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { GlobalFooService } from 'src/services/events.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id: string
  user = {} as User; 
  userSubscription: Subscription; 

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, 
    private globalFooService: GlobalFooService, private userService: UserService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userSubscription = this.userService.getUser(this.id).subscribe((data)=>{

        this.user = data; 

        this.user.lastName = this.user.lastName.toUpperCase();
    })
  }


  goTo(name: string){

    this.globalFooService.publishSomeData({go: 'Accueil'})

    this.navCtrl.navigateRoot([name+"/"+this.id]);

  }

}
