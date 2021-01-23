import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { User } from "src/models/user.model";
import { map, take } from 'rxjs/operators';


@Injectable()
export class UserService{

    users$ = new Subject<User[]>();

    users: User[] ;

    usersCollection: AngularFirestoreCollection;
    usersList:Observable<any[]>; 

    constructor(private firestore: AngularFirestore){

        this.usersCollection = this.firestore.collection('users');

        this.usersList = this.usersCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );
    }

    emitUsers(){

        this.usersList.subscribe(data=>{

            this.users$.next(data.slice());

        })

       
}

getUsers(){

    return this.usersList;
}

getUser(id: string){

        return this.usersCollection.doc<User>(id).valueChanges().pipe(
            take(1), 
            map(user=>{
                user.id = id; 
                return user
            })
        )
}

addUser(user: User){
   return  this.usersCollection.add(user);
}

updateUser(user: User){
    return this.usersCollection.doc(user.id).update(user);
}

deleteCUser(id){
    return this.usersCollection.doc(id).delete();
}

}