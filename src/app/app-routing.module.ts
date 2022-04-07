import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'offers',
    pathMatch: 'full'
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'myOffers',
    loadChildren: () => import('./myOffers/myOffers.module').then( m => m.MyOffersPageModule)
  },
  {
    path: 'myVehicles',
    loadChildren: () => import('./myVehicles/myVehicles.module').then( m => m.MyVehiclesPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'perimeters',
    loadChildren: () => import('./perimeters/perimeters.module').then( m => m.PerimetersPageModule)
  },
  {
    path: 'signOut',
    loadChildren: () => import('./signOut/signOut.module').then( m => m.SignOutPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
