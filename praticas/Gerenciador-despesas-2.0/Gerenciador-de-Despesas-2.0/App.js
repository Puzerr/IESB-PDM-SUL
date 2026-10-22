// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ExpensesContextProvider } from "./src/store/expenses-context";
import TodasDespesas from "./src/screens/TodasDespesas";
import DespesasRecentes from "./src/screens/DespesasRecentes";
import GerenciarDespesa from "./src/screens/GerenciarDespesa";
import { Colors } from "./src/constants/theme";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.cardBackground },
        headerTitleStyle: { color: theme.textPrimary },
        tabBarStyle: { backgroundColor: theme.cardBackground },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate("GerenciarDespesa")}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="add" size={26} color={theme.primary} />
          </Pressable>
        ),
      })}
    >
      <BottomTabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: "Recentes",
          tabBarLabel: "Recentes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: "Todas as Despesas",
          tabBarLabel: "Todas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpenseOverview"
            component={ExpenseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
