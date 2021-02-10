import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { of, Subscription } from 'rxjs';
import { Categorie } from 'src/models/categorie.model';
import { Chronic } from 'src/models/chronic.model';
import { Text } from 'src/models/text.model';
import { User } from 'src/models/user.model';
import { Views } from 'src/models/views.model';
import { AuthService } from 'src/services/auth.service';
import { CategorieService } from 'src/services/categorie.service';
import { ChronicService } from 'src/services/chronic.service';
import { CompressImageService } from 'src/services/compress.image.service';
import { GlobalFooService } from 'src/services/events.service';
import { LoadingService } from 'src/services/loading.service';
import { TextService } from 'src/services/text.service';
import { UserService } from 'src/services/user.service';
import { ViewService } from 'src/services/views.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  id: string; 

  chronicSubscription: Subscription; 
  chronics: Chronic[];

  chronicSubscription2: Subscription; 
  chronics2: Chronic[];

  chronic = {} as Chronic;
  
  photo: any; 

  viewSubscription: Subscription; 
  views: Views[]; 

  categorieSubscription: Subscription; 
  categories: Categorie[];

  textSubscription: Subscription; 
  texts: Text[];

  menuItems = [
    [{
      name: "Accueil", 
      icon: 'home', 
      root: 'dashboard'
    }, 
    [
      {
        a: 'yes', 
        b: 'Merde', 
        c: 'Regarde'
      }
    ]
  
  ], 
    {
      name: 'Mon profil', 
      icon: "person", 
      root: 'profile'
    }, 
    {
      name: "Ma bibliothèque", 
      icon: "book", 
      root: "my-books"
    }, 
    {
      name: 'Mes écrits', 
      icon: "create", 
      root: "created"
    }
  ]; 

  alls: any;

  finalCovers: Array<[{text: string}, Chronic[]]>; 
  finalChronics: any;
  solo: Array<Chronic>;
  chrs: Chronic[];
  all: any; 

  userSubscription: Subscription; 
  user = {} as User;

  constructor(private menuCtrl: MenuController, private activatedRoute: ActivatedRoute, 
              private userService: UserService, private chronicService: ChronicService, 
              private categorieService: CategorieService, private viewService: ViewService, 
              private textService: TextService, private modalCtrl:ModalController, 
              private loadingService: LoadingService, private authService: AuthService, 
              private navCtrl: NavController, private globlFooService: GlobalFooService) {

                this.menuCtrl.enable(true);

                console.log(this.menuItems);

               

                  this.loadingService.present();

              

                  setTimeout(()=>{

                    this.loadingService.dismiss();
                  }, 5000)
               }
               

  

  ngOnInit() {


    this.globlFooService.getObservable().subscribe((data)=>{

        if(data.logout){

          this.chronicSubscription.unsubscribe(); 
          this.chronicSubscription2.unsubscribe();
          this.viewSubscription.unsubscribe(); 
          this.categorieSubscription.unsubscribe(); 
          this.textSubscription.unsubscribe();
        }
    })

   

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.authService.user_id = this.id;

    this.chronicSubscription = this.chronicService.chronics$.subscribe((data)=>{


        this.chronics = data; 
        console.log(this.chronics);

        this.chronicSubscription2 = this.chronicService.chronics2$.subscribe((data2)=>{

          this.chronics2 = data2;

        this.categorieSubscription = this.categorieService.categories$.subscribe((data3)=>{

            this.categories = data3; 

            this.viewSubscription = this.viewService.views$.subscribe((data4)=>{

                this.views = data4; 

              
                this.textSubscription = this.textService.texts$.subscribe((data5)=>{

                  this.texts = data5; 

                 

                  console.log(this.texts)

                  for(let chronic of this.chronics){

                    if(chronic.active){

                      this.userSubscription = this.userService.getUser(chronic.user_key).subscribe(data6=>{

                        chronic.user_name = data6.firstName + " "+ data6.lastName.toUpperCase();

                        
                       

                      })

                      var i = 0; 
                      for(let categorie of this.categories){

                        if(categorie.cd_id == chronic.c_id){

                          chronic.categorie = categorie.cd_name;

                          i++;
                        }

                      }

                      if(i == 0){

                          chronic.categorie = "Sous réserve"
                      }

                    }
                }


                var i = 0;
                var a = 0; 
                this.solo =  []; 
                this.finalChronics = [];
                this.finalChronics[a] = []; 

                var test: boolean;
                var test2: boolean;  
                this.chrs = [];
                var l = 0; 


                var chronics : Chronic[] = []; 

                for(let c of this.chronics){

                    if(c.active){

                        chronics.push(c);
                    }
                }


                console.log(chronics);

                for(let chronic of chronics){

                      if(i !==0 && i%7 == 0){

                        this.finalChronics[a] = this.chrs;
                        a++; 
                        this.finalChronics[a] = [];
                        this.chrs = [];


                        test = true; 
                        
                      }


                      if(test2){

                        this.solo.push(chronic); 
                        test2= false; 

                      }else{

                        this.chrs.push(chronic);

                      }

                      if(test){

                        test2 = true; 
                        test = false; 
                      
                      }

                      i++;

                      l++; 

                    
                   
                    

                    if(l == chronics.length && i%7 !==0){
                     

                      this.finalChronics[a] = this.chrs;
                      console.log(this.chrs);

                    }
                }


                var c = 0; 
                var d = 0; 
                this.finalCovers = [];
                this.finalCovers[d] = [{text: null}, []];
                var covers : Array<Chronic> = [];

                var finalcovs = [];

                for(let ch of this.chronics2){

                  if(ch.active){

                    finalcovs.push(ch);
                  }

                }

                for(let ch of finalcovs){

                    if(ch.active){


                      if(c !==0 && c%9==0){

                        this.finalCovers[d] = [{text: this.texts[this.entierAleatoire(0,6)].t_text}, covers]; 
                        d++; 

                        covers = [];

                      }

                      covers.push(ch);

                    

                      c++

                      if(c == finalcovs.length){

                        this.finalCovers[d] = [{text: this.texts[this.entierAleatoire(0,6)].t_text}, covers]; 
                      }
                    }
              
                  }

                console.log(this.finalCovers);
                console.log(this.finalChronics); 
                console.log(this.solo);

                var j = 0; 

                this.all = [];
                if(this.finalChronics.length >= this.finalCovers.length){

                  for(let c of this.finalChronics){

                    if(this.finalCovers[j] && this.solo[j]){

                      this.all[j]= [c, this.finalCovers[j], this.solo[j]];

                    }


                    if(this.finalCovers[j] && !this.solo[j]){

                      this.all[j]= [c, this.finalCovers[j], []];

                    }


                    if(!this.finalCovers[j] && this.solo[j]){

                      this.all[j]= [c, [], this.solo[j]];

                    }

                    if(!this.finalCovers[j] && !this.solo[j]){

                      this.all[j] = [c, [], []];
                    }

                   

                    j++;
                  }

                  this.alls = this.all; 

                }else{

                    for(let ch of this.finalCovers){

                        if(this.solo[j] && this.finalChronics[j]){

                          this.all[j]= [this.finalChronics[j], ch,  this.solo[j]];

                        }

                        if(!this.solo[j] && !this.finalChronics[j]){

                            this.all[j] = [[], ch, []];
                        }

                        if(this.finalChronics[j] && !this.solo[j]){

                            this.all[j] = [this.finalChronics[j], ch, []];
                        }

                      j++;
                    }
                }

                })


            })
        })
        
        
    })


        
    })

    this.chronicService.emitChronics(1);

    this.chronicService.emitChronics(2);
    this.categorieService.emitCategories();
    this.viewService.emitViews();
    this.textService.emitTexts();
  
  }

  goToChronic(id: string){

    this.navCtrl.navigateForward(['chronic-details/'+id]);

  }

  
 entierAleatoire(min, max)
 {
  return Math.floor(Math.random() * (max - min + 1)) + min;
 }

  openMenu(){

      this.menuCtrl.open();
  }

  filterJsonData(ev: any){

    const val = ev.target.value; 
    
    var texts = []; 
    var chronics : Chronic[] = [];
    this.all = this.alls; 

    if(val && val.trim() !== ""){

       

      this.all = this.all.filter((item)=>{

          if(item[0]){

            item[0].filter((item2)=>{

                if(item2.title){

                  if(item2.title.toLowerCase().indexOf(val.toLowerCase())> -1){

                    chronics.push(item2); 

                }else{

                    texts.push(item2);
                }

                }
            })

          }

          if(item[2]){

            if(item[2].title){

              if(item[2].title.toLowerCase().indexOf(val.toLowerCase())> -1){

                chronics.push(item[2]); 

            }else{

                texts.push(item[2]);
            }

            }

              
          }

          
      })



                var i = 0;
                var a = 0; 
                var solo =  []; 
                var finalChronics = [];
                finalChronics[a] = []; 

                var test: boolean;
                var test2: boolean;  
                var chrs = [];
                var l = 0; 

                for(let chronicc of chronics){

                  if(chronicc.active){

                   

                    if(i !==0 && i%7 == 0){

                      finalChronics[a] = chrs;
                      a++; 
                      finalChronics[a] = [];
                      chrs = [];


                      test = true; 
                      
                    }


                    if(test2){

                      solo.push(chronicc); 
                      test2= false; 

                    }else{

                      chrs.push(chronicc);

                    }

                    if(test){

                      test2 = true; 
                      test = false; 
                    
                    }

                    i++;

                  }
                 
                  l++; 

                  if(l == chronics.length && i%7 !==0){


                    finalChronics[a] = chrs;

                  }
              }

              var tout  = []; 
              var k = 0
              for(let c of finalChronics){

                if(solo[k]){

                  tout[k] = [c, [], solo[k]];

                }else{

                  tout[k] = [c, [], []];

                }

                 

                  k++;
              }

              console.log(tout);

              return this.all = tout;
      

    }

    
  }

  ngOnDestroy(){

    this.chronicSubscription.unsubscribe(); 
    this.chronicSubscription2.unsubscribe();
    this.viewSubscription.unsubscribe(); 
    this.categorieSubscription.unsubscribe(); 
    this.textSubscription.unsubscribe();
}

}
