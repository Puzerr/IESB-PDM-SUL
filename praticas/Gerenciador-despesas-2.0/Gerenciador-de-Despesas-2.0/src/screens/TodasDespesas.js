import { useState, useMemo } from "react";
import { View, TextInput, StyleSheet, useColorScheme } from "react-native";
import { useExpenses } from "../store/expenses-context";
import { useDebounce } from "../hooks/useDebounce";
import { Colors } from "../constants/theme";
import DespesaLista from "../components/despesas/DespesaLista";
import DespesaSumario from "../components/despesas/DespesaSumario";

function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 300);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const filtrarDespesas = useMemo(() => {
    if (!debouncedSearch.trim()) return expenses;
    return expenses.filter((e) =>
      e.description.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [expenses, debouncedSearch]);

  function handleSelectItem(id) {
    navigation.navigate("GerenciarDespesa", { expenseId: id });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.inputBackground,
              color: theme.textPrimary,
              borderColor: theme.border,
            },
          ]}
          placeholder="Buscar despesa por descrição..."
          placeholderTextColor={theme.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <DespesaLista
        despesas={filtrarDespesas}
        onSelectItem={handleSelectItem}
        ListHeader={
          <DespesaSumario
            despesas={filtrarDespesas}
            periodo={`Exibindo: ${filtrarDespesas.length} item(s)`}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
});

export default TodasDespesas;
