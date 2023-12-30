import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const BelgeTipleriPage = lazy(() => import('src/pages/belge-tipleri'));
export const NacePage = lazy(() => import('src/pages/nace-kodlari'));
export const LokasyonPage = lazy(() => import('src/pages/lokasyonlar'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'firma-listesi', element: <UserPage /> },
        { path: 'nace-kodlari', element: <NacePage /> },
        { path: 'lokasyonlar', element: <LokasyonPage /> },
        { path: 'belge-tipleri', element: <BelgeTipleriPage /> },
      ],
    },
    {
      path: '',
      element: <LoginPage />,
      index: true
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
