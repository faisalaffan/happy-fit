import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName="Home">
          {routes.map((item, i) => {
            return (
              <Stack.Screen
                name={item.name}
                component={item.component}
                options={{
                  ...item.options,
                  headerShown: false,
                }}
                initialParams={item.initialParams}
                key={'#screen-' + item.name}
              />
            );
          })}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
