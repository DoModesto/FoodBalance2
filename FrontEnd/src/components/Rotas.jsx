import Inicial from '../screens/inicial';
import Imc from '../screens/Calculo_imc';
import Home from '../screens/Home';
import Icon from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Perfil from '../screens/perfil';
import ListarAlimentos from '../screens/listarAlimentos';

export default function Rotas() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ size, color }) => {
                let icon_nome;
                if (route.name === 'Perfil') {
                    icon_nome = 'home';
                }                
                else if (route.name === 'Imc') {
                    icon_nome = 'log-in';
                }
                else if (route.name === 'Inicial') {
                    icon_nome = 'log-in';
                }
                else if (route.name === 'comida') {
                    icon_nome = 'food';
                }
                return <Icon name={icon_nome} size={size} color={color} />
            },
            tabBarActiveTintColor: '#6AF33D',
            tabBarInactiveTintColor: '#a2a2a2',
            tabBarStyle: {
                backgroundColor: '#FEFEFF',
            }
        })}>
            <Tab.Screen name="Inicial" component={Inicial} />
            <Tab.Screen name="Imc" component={Imc} />
            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="comida" component={ListarAlimentos} />
            
           

        </Tab.Navigator>
    );
}