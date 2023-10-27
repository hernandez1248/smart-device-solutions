import Navigation from "./components/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./features/home/application/screens/HomeScreen";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"  
          options={{ headerShown: false}} 
          component={HomePage} />
        <Stack.Screen name="UsersScreen" options={{ headerShown: false}} component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


