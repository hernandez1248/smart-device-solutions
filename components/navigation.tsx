import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

// Importa tus pantallas
 import UserScreen from "../features/users/appication/screen/usersScreen";
 import ComponentScreen from "../features/components/application/screens/componentScreen";
import DeviceScreen from "../features/devices/appication/screens/devicesScreen";
/*import DeviceScreen from "../features/devices/appication/screens/devicesScreen";
import ComponentScreen from "../features/components/appication/screens/componentsScreen";
import OrderScreen from "../features/orders/application/screens/ordersScreen"; */

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12,},
       
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Users") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Devices") {
            iconName = focused ? "hardware-chip" : "hardware-chip-outline";
          } else if (route.name === "Components") {
            iconName = focused ? "apps" : "apps-outline";
          }
          return (
            <Ionicons
              name={iconName as any}
              size={size}
              color={focused ? "#237CDF" : "black"}
            />
          );
        },
        tabBarActiveTintColor: "#237CDF",
        tabBarInactiveTintColor: "gray",
      })}
    >
       <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{ headerShown: false, tabBarLabel: "Usuarios" }}
      />
       {/* <Tab.Screen
        name="Orders"
        component={AddUserScreen}
        options={{ headerShown: false, tabBarLabel: "Agregar" }}
    /> */}
      <Tab.Screen
        name="Devices"
        component={DeviceScreen}
        options={{ headerShown: false, tabBarLabel: "Dispositivos"}}
      />

     <Tab.Screen
        name="Components"
        component={ComponentScreen}
        options={{ headerShown: false, tabBarLabel: "Componentes" }}
      />  
      
    </Tab.Navigator>
  );
}

export default MyTabs;
