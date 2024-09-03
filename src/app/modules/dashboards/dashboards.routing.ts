import { Routes } from '@angular/router';

// dashboards
import { DashboardComponent } from './dashboard.component';
import { AppRoutes, RouterComponents } from '@utils/app-routes';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: RouterComponents.dashboard_analytical,
        component: DashboardComponent,
        data: {
          title: 'Analytical',
          urls: [
            { title: 'Analytical', url: `/${AppRoutes.dashboard_analytical}` },
          ],
        },
      },
    ],
  },
];
