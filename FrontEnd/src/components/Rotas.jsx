
import Imc from '../screens/Calculo_imc';
import Home from '../screens/Home';
import Icon from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Perfil from '../screens/perfil';
import ListarAlimentos from '../screens/listarAlimentos';

export default function Rotas() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ size, color }) => {
                    let icon_nome;
                    
                    if (route.name === 'Home') {
                        icon_nome = 'home-outline';
                    }                
                    else if (route.name === 'Comida') {
                        icon_nome = 'restaurant-outline';
                    }
                    else if (route.name === 'Imc') {
                        icon_nome = 'calculator-outline';
                    }
                    else if (route.name === 'Perfil') {
                        icon_nome = 'person-outline';
                    }
                    
                    return <Icon name={icon_nome} size={size} color={color} />
                },
                tabBarActiveTintColor: '#7ED957',
                tabBarInactiveTintColor: '#a2a2a2',
                tabBarStyle: {
                    backgroundColor: '#FEFEFF',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                }}
            />   
            <Tab.Screen 
                name="Comida" 
                component={ListarAlimentos}
                options={{
                    tabBarLabel: 'Comida',
                }}
            />
             <Tab.Screen 
                name="Imc" 
                component={Imc}
                options={{
                    tabBarLabel: 'IMC',
                }}
            />
             <Tab.Screen 
                name="Perfil" 
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                }}
            />
        </Tab.Navigator>
    );
}