import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./src/components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import DespesasRecentes from "./src/screens/DespesasRecentes";
import TodasDespesas from "./src/screens/TodasDespesas";
import GerenciarDespesas from "./src/screens/GerenciarDespesas";

export default function App() {
  const BottomTab = createBottomTabNavigator();

  function BottomTabScreen() {
    const navigation = useNavigation();

    return (
      <BottomTab.Navigator
        screenOptions={{
          headerRight: () => (
            <IconButton
              icon="add"
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} />
        <Stack.Screen name="GerenciarDespesas" component={GerenciarDespesas} />
      </Stack.Navigator>
    </NavigationContainer>
  )}
