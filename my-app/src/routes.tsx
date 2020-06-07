import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
/** esse pacote permite chamar as próximas telas através do botão 
 * e as telas anteriores não deixam de desistir
 * */ 
import { createStackNavigator } from '@react-navigation/stack';//lib

import Home from './pages/Home';
import Personal from './pages/Personal';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            {/* 1° chave código javascript, 2° chave é um objeto */}
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{ 
                    cardStyle: {
                        backgroundColor: '#174564'
                    } 
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Personal" component={Personal} />
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
