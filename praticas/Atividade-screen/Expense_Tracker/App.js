import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesas from "./screens/GerenciarDespesas";
import TodasDespesas from "./screens/TodasDespesas";
import IconButton from "./components/IconButton";

export default function App() {
  const BottomTab = createBottomTabNavigator();

  function BottomTabScreen() {
    const navigation = useNavigation();
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerRight: () => (
            <IconButton
              icon="arrow-forward-outline"
              size={24}
              onPress={() => {
                navigation.navigate("GerenciarDespesas");
              }}
            />
          ),
        }}
      >
        <BottomTab.Screen
          name="DespesasRecentes"
          component={DespesasRecentes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
            tabBarLabel: "Recentes",
            title: "Despesas Recentes",
            tabBarLabelStyle: { fontSize: 12 },
          }}
        />
        <BottomTab.Screen
          name="TodasDespesas"
          component={TodasDespesas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
            tabBarLabel: "Todas",
            title: "Todas as Despesas",
            tabBarLabelStyle: { fontSize: 12 },
          }}
        />
      </BottomTab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Despesas"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesas"
            component={GerenciarDespesas}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
