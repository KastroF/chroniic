import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { map, take } from 'rxjs/operators';
import { Categorie } from "src/models/categorie.model";


@Injectable()
export class CategorieService{

    categories$ = new Subject<Categorie[]>();

  

    categoriesCollection: AngularFirestoreCollection;
    categoriesList:Observable<any[]>; 

    constructor(private firestore: AngularFirestore){

        this.categoriesCollection = this.firestore.collection('categories');

        this.categoriesList = this.categoriesCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );
    }

    emitCategories(){

        this.categoriesList.subscribe(data=>{

            this.categories$.next(data.slice());

        })

       
}


}