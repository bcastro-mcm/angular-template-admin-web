import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@core/utils/app-routes';
import { NgModule } from '@angular/core';
import { ErrorComponent } from '@modules/error/error.component';
import { FullComponent } from '@layouts/full/full.component';
import { NoAuthGuard } from '@guards/no-auth.guard';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.auth,
  },
  {
    path: AppRoutes.auth,
    loadChildren: () => import('@modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: AppRoutes.home,
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.store,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.users,
        loadChildren: () =>
          import('@modules/users/users.module').then(
            (m) => m.UsersModules
          ),
      },
      {
        path: AppRoutes.dashboard,
        loadChildren: () =>
          import('@modules/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: AppRoutes.notifications,
        loadChildren: () =>
          import('@modules/notifications/notifications.module').then((m) => m.NotificationsModule),
      },
      {
        path: AppRoutes.points,
        loadChildren: () =>
          import('@modules/admin-points/admin-points.module').then((m) => m.AdminPointsModule),
      },
      {
        path: AppRoutes.about_app,
        loadChildren: () =>
          import('@modules/admin-about-app/admin-about-app.module').then((m) => m.AdminAboutAppModule),
      },
      {
        path: AppRoutes.store,
        loadChildren: () =>
          import('@modules/stores/stores.module').then((m) => m.StoresModule),
      },
      {
        path: AppRoutes.onboarding,
        loadChildren: () =>
          import('@modules/admin-onboarding/admin-onboarding.module').then((m) => m.AdminOnboardingModule),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableViewTransitions: true , scrollPositionRestoration: 'top'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
