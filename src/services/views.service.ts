import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { map, take } from 'rxjs/operators';
import { Views } from "src/models/views.model";


@Injectable()
export class ViewService{

    views$ = new Subject<Views[]>();

  

    viewsCollection: AngularFirestoreCollection;
    viewsList:Observable<any[]>; 

    constructor(private firestore: AngularFirestore){

        this.viewsCollection = this.firestore.collection('views');

        this.viewsList = this.viewsCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );
    }

    emitViews(){

        this.viewsList.subscribe(data=>{

            this.views$.next(data.slice());

        })

       
}


}