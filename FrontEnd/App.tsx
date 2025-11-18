import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/login";
import Cadastro from "./src/screens/Cadastro";
import Historico from './src/screens/Historico';
import Home from "./src/screens/Home";
import Rotas from "./src/components/Rotas";
import Inicial from './src/screens/inicial';
import Imc from './src/screens/Calculo_imc';
import Perfil from './src/screens/perfil';
import ListarAlimentos from './src/screens/listarAlimentos';


function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={{
            headerShown: false,
            headerTitle: 'Página Inicial',
            headerTintColor: '#e9ff25',
            headerStyle: { backgroundColor: '#ff2525' },
          }}
        />
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Rotas" component={Rotas} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Imc" component={Imc} />
        <Stack.Screen name="Principal" component={Perfil} />
        <Stack.Screen name="ListarComida" component={ListarAlimentos} />
      </Stack.Navigator>
    </NavigationContainer>

  );



}

export default App;