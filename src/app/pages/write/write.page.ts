import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Chronic } from 'src/models/chronic.model';
import { AuthService } from 'src/services/auth.service';
import { ChronicService } from 'src/services/chronic.service';
import { GlobalFooService } from 'src/services/events.service';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.page.html',
  styleUrls: ['./write.page.scss'],
})
export class WritePage implements OnInit {

  chronicSubscription: Subscription; 
  chronics: Chronic[] = [];
  id: string;

  constructor(private menuCtrl: MenuController, private chronicService: ChronicService, 
              private authService: AuthService, private navCtrl: NavController,
              private loadingService: LoadingService, private globalFooService: GlobalFooService) {

                this.menuCtrl.enable(true,"first");
                this.menuCtrl.enable(true);

                this.globalFooService.getObservable().subscribe((data)=>{

                    if(data.closeCrop){

                      this.menuCtrl.enable(true,"first");
                      this.menuCtrl.enable(true);

                    }
                })

                
               }

            



  ngOnInit() {

   
    this.loadingService.present();

    this.id = this.authService.user_id;

    this.chronicSubscription = this.chronicService.chronics$.subscribe((data)=>{

      this.chronics = [];

        for(let ch of data){

            if(ch.active && ch.user_key == this.id){

                this.chronics.push(ch);
            }

            this.loadingService.dismiss();
        }
    })

    this.chronicService.emitChronics(1);


  }

  newChronic(){

    this.navCtrl.navigateForward(['chronic']);

  }

  openMenu(){

    this.menuCtrl.open();
  }

  ngOnDestroy(){

      this.chronicSubscription.unsubscribe();
  }

}
