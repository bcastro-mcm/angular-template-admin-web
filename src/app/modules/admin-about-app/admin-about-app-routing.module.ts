import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@utils/app-routes';
import { AboutAppComponent } from './about-app/about-app.component';

const routes: Routes = [
  {
    path: '',
    component: AboutAppComponent,
    data: {
      title: 'Sección Acerca de Aplicación',
      urls: [{ title: 'Actualizar información', url: `/${AppRoutes.dashboard}` }],
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAboutAppRoutingModule { }
