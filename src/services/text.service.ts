import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { map, take } from 'rxjs/operators';
import { Text } from "src/models/text.model";


@Injectable()
export class TextService{

    texts$ = new Subject<Text[]>();

  

    textsCollection: AngularFirestoreCollection;
    textsList:Observable<any[]>; 

    constructor(private firestore: AngularFirestore){

        this.textsCollection = this.firestore.collection('texts');

        this.textsList = this.textsCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );
    }

    emitTexts(){

        this.textsList.subscribe(data=>{

            this.texts$.next(data.slice());

        })

       
}


}