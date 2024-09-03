import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOnboardingComponent } from './list-onboarding/list-onboarding.component';
import { AppRoutes, RouterComponents } from '@utils/app-routes';
import { AddOnboardingComponent } from './add-onboarding/add-onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: ListOnboardingComponent,
    data: {
      title: 'Administrar Onboarding',
      urls: [{ title: 'Administrar niveles', url: `/${AppRoutes.dashboard}` }],
    },
  },
  {
    path: RouterComponents.add_onboarding,
    component: AddOnboardingComponent,
    data: {
      title: 'Agregar Onboarding',
      urls: [{ title: 'Agregar Onboarding', url: `/${AppRoutes.list_onboarding}` }],
      canBack: true
    },
  },
  {
    path: RouterComponents.edit_onboarding,
    component: AddOnboardingComponent,
    data: {
      title: 'Editar Onboarding',
      urls: [{ title: 'Editar Onboarding', url: `/${AppRoutes.list_onboarding}` }],
      canBack: true
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOnboardingRoutingModule { }
