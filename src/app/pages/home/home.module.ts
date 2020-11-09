import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SampleContractComponent } from 'src/app/components/sample-contract/sample-contract.component'
import { SupportingProjectItemComponent } from 'src/app/components/supporting-project-item/supporting-project-item.component'

import { HomePage } from './home.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, SampleContractComponent, SupportingProjectItemComponent]
})
export class HomePageModule {}
