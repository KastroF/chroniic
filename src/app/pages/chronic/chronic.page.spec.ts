import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChronicPage } from './chronic.page';

describe('ChronicPage', () => {
  let component: ChronicPage;
  let fixture: ComponentFixture<ChronicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
