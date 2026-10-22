import { useMemo } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { useExpenses } from "../store/expenses-context";
import { Colors } from "../constants/theme";
import DespesaLista from "../components/despesas/DespesaLista";
import DespesaSumario from "../components/despesas/DespesaSumario";

function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const recentExpenses = useMemo(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate >= sevenDaysAgo && expenseDate <= today;
    });
  }, [expenses]);

  function handleSelectItem(id) {
    navigation.navigate("GerenciarDespesa", { expenseId: id });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DespesaLista
        despesas={recentExpenses}
        onSelectItem={handleSelectItem}
        ListHeader={
          <DespesaSumario despesas={recentExpenses} periodo="Últimos 7 dias" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DespesasRecentes;
