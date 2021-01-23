import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Chronic } from 'src/models/chronic.model';


@Injectable()
export class ChronicService{

    chronicsCollection: AngularFirestoreCollection; 
    chronicsCollection2: AngularFirestoreCollection; 
    chronicsList: Observable<any[]>; 
    chronicsList2: Observable<any[]>;
 
    chronicsList4: Observable<any[]>;
    chronics$ = new Subject<Chronic[]>(); 
    chronics2$ = new Subject<Chronic[]>();
    chronics4$ = new Subject<Chronic[]>();
    chronicsCollection3: AngularFirestoreCollection;
    chronicsCollection4: AngularFirestoreCollection;

    constructor(private firestore: AngularFirestore){

        this.chronicsCollection = this.firestore.collection('chronics', ref=>ref.orderBy("date", "desc"));
        this.chronicsCollection2 = this.firestore.collection('chronics', ref=>ref.where('covert', '!=', ''));

        this.chronicsCollection4 = this.firestore.collection('chronics', ref=>ref.orderBy("views", "desc").limit(10));
        
        this.chronicsList = this.chronicsCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );

        this.chronicsList2 = this.chronicsCollection2.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );



        this.chronicsList4 = this.chronicsCollection4.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );


    }

    emitChronics(i: number){

        if(i == 1){

            this.chronicsList.subscribe(data=>{

                this.chronics$.next(data.slice());

    
            })

        }

        
        if(i == 2){

                this.chronicsList2.subscribe((data)=>{

                        this.chronics2$.next(data.slice());
                })
        }

        if(i == 4){

            this.chronicsList4.subscribe((data)=>{

                this.chronics4$.next(data.slice());
        })
        }

   
        
}

getChronics(){

        return this.chronicsList;
}



getChronic(id: string){

    return this.chronicsCollection.doc<Chronic>(id).valueChanges().pipe(
        take(1), 
        map(chronic=>{
            chronic.id = id; 
            return chronic
        })
    )
}

addChronic(chronic: Chronic){
return  this.chronicsCollection.add(chronic);
}

updateChronic(chronic: Chronic){
return this.chronicsCollection.doc(chronic.id).update(chronic);
}

deleteChronic(id){
return this.chronicsCollection.doc(id).delete();
}




}