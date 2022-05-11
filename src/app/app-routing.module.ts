import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'offers/vehicle-full',
    loadChildren: () => import('./offers/vehicle-full/vehicle-full.module').then( m => m.VehicleFullPageModule)
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
    path: 'myVehicles/vehicle',
    loadChildren: () => import('./myVehicles/vehicle/vehicle.module').then( m => m.VehiclePageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'users/user',
    loadChildren: () => import('./users/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'perimeters',
    loadChildren: () => import('./perimeters/perimeters.module').then( m => m.PerimetersPageModule)
  },
  {
    path: 'perimeters/perimeter',
    loadChildren: () => import('./perimeters/perimeter/perimeter.module').then( m => m.PerimeterPageModule)
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
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
