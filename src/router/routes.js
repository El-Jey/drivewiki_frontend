import CarsApp from '@/components/Cars';
import MotorcyclesApp from '@/components/Motorcycles';
import Home from '@/components/Home';

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