import CarsApp from '@/Pages/Cars';
import MotorcyclesApp from '@/Pages/Motorcycles';
import Home from '@/Pages/Home';

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cars',
    name: 'Cars',
    component: CarsApp
  },
  {
    path: '/motorcycles',
    name: 'Motorcycles',
    component: MotorcyclesApp
  }
];

export default routes;