import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled', // or 'top'
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
