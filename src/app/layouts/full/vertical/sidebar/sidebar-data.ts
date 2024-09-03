import { AppRoutes } from '@utils/app-routes';
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'aperture',
    route: '/home/dashboard/analytical',
  },
  {
    navCap: 'Negocio',
  },
  {
    displayName:'Mis Tiendas',
    iconName:'building-store',
    // route:'home/users',
    children:[
      {
        displayName:"Ver tiendas",
        iconName:'point',
        route: AppRoutes.list_stores
      },
      {
        displayName:"Agregar tienda",
        iconName:'point',
        route: AppRoutes.add_store
      },
    ]
  },
  {
    navCap: 'Aplicación',
  },
  // {
  //   displayName:'Users',
  //   iconName:'user',
  //   // route:'home/users',
  //   children:[
  //     {
  //       displayName:"Usuarios",
  //       iconName:'point',
  //       route:'home/users'
  //     },
  //     {
  //       displayName:"Añadir Usuario",
  //       iconName:'point',
  //       route:'home/users/add'
  //     },
  //   ]
  // },
  // {
  //   displayName:"Usuarios",
  //   iconName:'user',
  //   route:'home/users'
  // },
  {
    displayName:"Onboarding",
    iconName:'photo-edit',
    route:'home/onboarding'
  },
  {
    displayName:"Notificaciones",
    iconName:'bell-ringing',
    route:'home/notifications'
  },
  {
    displayName:"Niveles",
    iconName:'layout-grid-remove',
    route:'home/points'
  },
  // {
  //   displayName:"Acerca de",
  //   iconName:'layout-2',
  //   route:'home/about-app'
  // },
  {
    navCap: 'Administrador',
  },
  {
    displayName:"Editar perfil",
    iconName:'user-check',
    route:'home/users/admin'
  }

];
