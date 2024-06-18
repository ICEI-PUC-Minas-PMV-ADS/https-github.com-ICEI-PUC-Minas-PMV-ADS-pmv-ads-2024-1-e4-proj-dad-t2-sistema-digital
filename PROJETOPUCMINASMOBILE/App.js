
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Login';
import Home from './Home';
import Categoria from './Categoria';
import Despesa from './Despesa';
import Receita from './Receita';
import UsuarioSistemaFinanceiro from './UsuarioSistemaFinanceiro';
import SistemaFinanceiro from './SistemaFinanceiro'; 

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="SistemaFinanceiro" component={SistemaFinanceiro} />
        <Tab.Screen name="Categoria" component={Categoria} />
        <Tab.Screen name="Receita" component={Receita} />
        <Tab.Screen name="Despesa" component={Despesa} />
        <Tab.Screen name="UsuarioSistemaFinanceiro" component={UsuarioSistemaFinanceiro} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
