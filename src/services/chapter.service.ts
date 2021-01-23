import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Chapter } from 'src/models/chapter.model';
import { Chronic } from 'src/models/chronic.model';


@Injectable()
export class ChronicService{

    chaptersCollection: AngularFirestoreCollection; 
    chaptersList: Observable<any[]>; 
    
    chapters$ = new Subject<Chapter[]>(); 
   
    constructor(private firestore: AngularFirestore){

        this.chaptersCollection = this.firestore.collection('chapters', ref=>ref.orderBy("date", "asc"));
        
        this.chaptersList = this.chaptersCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );




    }

    emitChapters(){

      

            this.chaptersList.subscribe(data=>{

                this.chapters$.next(data.slice());

    
            })

   

   
        
}




getChapter(id: string){

    return this.chaptersCollection.doc<Chapter>(id).valueChanges().pipe(
        take(1), 
        map(chapter=>{
            chapter.id = id; 
            return chapter
        })
    )
}

addChapter(chapter: Chapter){
return  this.chaptersCollection.add(chapter);
}

updateChapter(chapter: Chapter){
return this.chaptersCollection.doc(chapter.id).update(chapter);
}

deleteChapter(id){
return this.chaptersCollection.doc(id).delete();
}



}