import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/models/categorie.model';
import { CategorieService } from 'src/services/categorie.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categorieSubscription: Subscription; 
  categories: Categorie[];

  table: any = [];

  constructor(private modalCtrl: ModalController, private categorieService: CategorieService, 
              private menuCtrl: MenuController) {

    this.menuCtrl.enable(false);
    this.menuCtrl.enable(false,"first");
   }

  ngOnInit() {

    this.categorieSubscription = this.categorieService.categories$.subscribe((data)=>{

        this.categories = data;

        console.log(this.categories);
    })

    this.categorieService.emitCategories();
  }

  dismissModal(){

    this.modalCtrl.dismiss();
  }

  ngOnDestroy(){
    this.categorieSubscription.unsubscribe();
  }


  check(checked, i: number){


      if(checked){

        this.table.push({index: i, checked: checked});

      }else{

        for( var j = 0; j < this.table.length; j++){ 
    
          if ( this.table[j].index === i) { 
      
              this.table.splice(j, 1); 
          }
      
      }
      }

     
  }


  validate(){

    var tabllee: any = [];

    for(let t of this.table){

        tabllee.push(this.categories[t.index].cd_name);
    }

    
    this.modalCtrl.dismiss(tabllee);

  }

}
