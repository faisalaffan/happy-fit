import HomeScreen from './pages/Home';
import DetailScreen from './pages/DetailMovie';

const routes = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      title: 'TV Show',
      animation: 'fade',
      statusBarAnimation: 'fade',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //     fontWeight: 'lighter',
      //     fontSize: 15,
      //   },
      headerShown: false,
      //   statusBarHidden: true,
      headerShadowVisible: false,
      headerLargeTitleShadowVisible: false,
    },
  },
  {
    name: 'Details',
    component: DetailScreen,
    options: {
      title: 'ASD',
      animation: 'fade',
      statusBarAnimation: 'fade',
    },
    initialParams: {
      itemId: 86,
      name: 'faisal',
    },
  },
];

export default routes;
