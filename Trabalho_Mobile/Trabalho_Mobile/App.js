// App.js (ou App.ts se preferir usar TypeScript)
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './src/navigation/TabNavigator';
import { AppContextProvider } from './src/context/AppContext'; // Importa o provedor de contexto

export default function App() {
  return (
    // Envolve toda a aplicação com o AppContextProvider
    <AppContextProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
}