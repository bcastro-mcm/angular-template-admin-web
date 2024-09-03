import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStoresComponent } from './list-stores/list-stores.component';
import { AppRoutes, RouterComponents } from '@utils/app-routes';
import { AddStoreComponent } from './add-store/add-store.component';

const routes: Routes = [
  {
    path: '',
    component: ListStoresComponent,
    data: {
      title: 'Tiendas Físicas',
      urls: [{ title: 'Tiendas Físicas', url: `/${AppRoutes.dashboard}` }],
    },
  },
  {
    path: RouterComponents.add_store,
    component: AddStoreComponent,
    data: {
      title: 'Agregar tienda',
      urls: [{ title: 'Agregar tienda', url: `/${AppRoutes.list_stores}` }],
      canBack: true
    },
  },
  {
    path: RouterComponents.edit_store,
    component: AddStoreComponent,
    data: {
      title: 'Editar tienda',
      urls: [{ title: 'Editar tienda', url: `/${AppRoutes.list_stores}` }],
      canBack: true
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
