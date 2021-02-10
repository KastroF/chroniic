import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.page.html',
  styleUrls: ['./cgu.page.scss'],
})
export class CguPage implements OnInit {

  constructor(private modalController: ModalController, private menuCtrl: MenuController) {

    this.menuCtrl.enable(false);
    this.menuCtrl.enable(false,"first");
   }

  ngOnInit() {
  }

  dismissModal(){
    this.modalController.dismiss();
  }


}
