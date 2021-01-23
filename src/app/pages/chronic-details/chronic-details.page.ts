import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chronic } from 'src/models/chronic.model';
import { AuthService } from 'src/services/auth.service';
import { ChronicService } from 'src/services/chronic.service';

import * as $ from 'jquery';


@Component({
  selector: 'app-chronic-details',
  templateUrl: './chronic-details.page.html',
  styleUrls: ['./chronic-details.page.scss'],
})
export class ChronicDetailsPage implements OnInit {



  id: string;
  user_id: string;  

  chronic = {} as Chronic; 
  chronicSubscription: Subscription; 

  chronicSubscription2: Subscription; 
  chronics: Chronic[];

  finalChronics : Chronic[] = [];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, 
              private chronicService: ChronicService) {



   }

  ngOnInit() {

   

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.user_id = this.authService.user_id; 


    this.chronicSubscription = this.chronicService.getChronic(this.id).subscribe((data)=>{

        this.chronic = data; 

        console.log(this.chronic);

        this.chronicSubscription2 = this.chronicService.chronics$.subscribe((data2)=>{

            this.chronics = data2; 

            this.finalChronics.push(this.chronic);

            for(let c of this.chronics){

              if(c.active && c.user_key == this.chronic.user_key && c.id !==this.id){

                  this.finalChronics.push(c);
              }

            }


            console.log(this.finalChronics);

        })

    })


    this.chronicService.emitChronics(1);

  }


  ngOnDestroy(){

      this.chronicSubscription.unsubscribe(); 
      this.chronicSubscription2.unsubscribe();
  }

}
