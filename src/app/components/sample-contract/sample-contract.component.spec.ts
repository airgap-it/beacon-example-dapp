import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SampleContractComponent } from './sample-contract.component'

describe('SampleContractComponent', () => {
  let component: SampleContractComponent
  let fixture: ComponentFixture<SampleContractComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SampleContractComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents()

    fixture = TestBed.createComponent(SampleContractComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
