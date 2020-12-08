import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SupportingProjectItemComponent } from './supporting-project-item.component'

describe('SupportingProjectItemComponent', () => {
  let component: SupportingProjectItemComponent
  let fixture: ComponentFixture<SupportingProjectItemComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SupportingProjectItemComponent],
        imports: [IonicModule.forRoot()]
      }).compileComponents()

      fixture = TestBed.createComponent(SupportingProjectItemComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
