import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatedPage } from './created.page';

describe('CreatedPage', () => {
  let component: CreatedPage;
  let fixture: ComponentFixture<CreatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
