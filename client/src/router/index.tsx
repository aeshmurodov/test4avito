import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AdsListPage from '../components/list/AdsListPage';
import AdDetailsPage from '../components/item/AdDetailsPage';
import StatsPage from '../components/stats/StatsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <AdsListPage /> },
      { path: '/list', element: <AdsListPage /> },
      { path: '/item/:id', element: <AdDetailsPage /> },
      { path: '/stats', element: <StatsPage /> },
    ],
  },
]);
