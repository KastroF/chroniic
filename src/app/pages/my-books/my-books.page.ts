import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {

  constructor(private menuCtrl: MenuController) { 

    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
