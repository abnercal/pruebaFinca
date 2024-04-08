import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '', loadChildren: () => import('./pages/pages/pages.module').then(m => m.PagesModule)
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
