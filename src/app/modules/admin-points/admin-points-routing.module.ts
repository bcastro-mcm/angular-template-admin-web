import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPointsComponent } from './list-points/list-points.component';
import { AppRoutes, RouterComponents } from '@utils/app-routes';
import { AddLevelComponent } from './add-level/add-level.component';

const routes: Routes = [
  {
    path: '',
    component: ListPointsComponent,
    data: {
      title: 'Administrar niveles',
      urls: [{ title: 'Administrar niveles', url: `/${AppRoutes.dashboard}` }],
    },
  },
  {
    path: RouterComponents.add_level,
    component: AddLevelComponent,
    data: {
      title: 'Agregar nivel',
      urls: [{ title: 'Agregar nivel', url: `/${AppRoutes.points}` }],
      canBack: true
    },
  },
  {
    path: RouterComponents.edit_level,
    component: AddLevelComponent,
    data: {
      title: 'Editar nivel',
      urls: [{ title: 'Editar nivel', url: `/${AppRoutes.points}` }],
      canBack: true
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPointsRoutingModule { }
