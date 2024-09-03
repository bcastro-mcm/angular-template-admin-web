import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AppRoutes, RouterComponents } from '@utils/app-routes';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';

export const UserRoutes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '',
      //   component: UsersComponent,
      //   data: {
      //     title: 'Usuarios',
      //     urls: [{ title: 'Usuarios', url: `/${AppRoutes.dashboard}` }],
      //   },
      // },
      // {
      //   path: RouterComponents.users_add,
      //   component: UserDetailComponent,
      //   data: {
      //     title: 'Añadir Usuarios',
      //     urls: [{ title: 'Añadir Usuarios', url: `/${AppRoutes.dashboard}` }],
      //   },
      // },
      {
        path: RouterComponents.user_admin,
        component: AdminUserDetailComponent,
        data: {
          title: 'Administrador',
          urls: [{ title: 'Administrador', url: `/${AppRoutes.dashboard}` }],
        },
      },
    ],
  },
];
