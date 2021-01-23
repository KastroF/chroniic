import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'cgu',
    loadChildren: () => import('./pages/cgu/cgu.module').then( m => m.CguPageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./pages/change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
  {
    path: 'dashboard/:id',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'created/:id',
    loadChildren: () => import('./pages/created/created.module').then( m => m.CreatedPageModule)
  },
  {
    path: 'my-books/:id',
    loadChildren: () => import('./pages/my-books/my-books.module').then( m => m.MyBooksPageModule)
  },
  {
    path: 'chronic-details/:id',
    loadChildren: () => import('./pages/chronic-details/chronic-details.module').then( m => m.ChronicDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
