import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Chronic } from 'src/models/chronic.model';
import { Payment } from 'src/models/payment.model';


@Injectable()
export class PaymentService{

    paymentsCollection: AngularFirestoreCollection;  
    paymentsList: Observable<any[]>; 
    payments$ = new Subject<Payment[]>(); 
   

    constructor(private firestore: AngularFirestore){

        this.paymentsCollection = this.firestore.collection('payments', ref=>ref.orderBy("date", "desc"));
        
        
        this.paymentsList = this.paymentsCollection.snapshotChanges().pipe(
            map(actions=>{
                return actions.map(a=>{
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc['id']; 

                    return {id, ...data};

                });

            })
        );



    }

    emitPayments(){

  

            this.paymentsList.subscribe(data=>{

                this.payments$.next(data.slice());

    
            })
        
}

getPayments(){

        return this.paymentsList;
}



getPayment(id: string){

    return this.paymentsCollection.doc<Payment>(id).valueChanges().pipe(
        take(1), 
        map(chronic=>{
            chronic.id = id; 
            return chronic
        })
    )
}

addPayment(payment: Payment){
return  this.paymentsCollection.add(payment);
}

updatePayment(payment: Payment){
return this.paymentsCollection.doc(payment.id).update(payment);
}

deletePayment(id){
return this.paymentsCollection.doc(id).delete();
}




}