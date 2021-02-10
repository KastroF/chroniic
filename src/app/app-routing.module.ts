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
  {
    path: 'write',
    loadChildren: () => import('./pages/write/write.module').then( m => m.WritePageModule)
  },
  {
    path: 'for-him',
    loadChildren: () => import('./pages/for-him/for-him.module').then( m => m.ForHimPageModule)
  },
  {
    path: 'chronic',
    loadChildren: () => import('./pages/chronic/chronic.module').then( m => m.ChronicPageModule)
  },
  {
    path: 'chronic-options/:id',
    loadChildren: () => import('./pages/chronic-options/chronic-options.module').then( m => m.ChronicOptionsPageModule)
  },
  {
    path: 'chapter-options/:id',
    loadChildren: () => import('./pages/chapter-options/chapter-options.module').then( m => m.ChapterOptionsPageModule)
  },
  {
    path: 'chapter/:id',
    loadChildren: () => import('./pages/chapter/chapter.module').then( m => m.ChapterPageModule)
  },
  {
    path: 'crop-image',
    loadChildren: () => import('./pages/crop-image/crop-image.module').then( m => m.CropImagePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },  {
    path: 'contract',
    loadChildren: () => import('./pages/contract/contract.module').then( m => m.ContractPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
