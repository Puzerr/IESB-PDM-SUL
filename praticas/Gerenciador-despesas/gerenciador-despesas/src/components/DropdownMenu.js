import { View, Text, StyleSheet } from "react-native";
import { useState, useMemo } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DespesaLista from "./despesas/DespesaLista";

function DropdownMenu({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categorias = [
    { label: "Todas", value: "Todas" },
    { label: "Contas", value: "Contas" },
    { label: "Alimentação", value: "Alimentação" },
    { label: "Transporte", value: "Transporte" },
  ];

  const despesasFiltradas = useMemo(() => {
    if (categoriaSelecionada === "Todas") {
      return despesas;
    }
    return despesas.filter(
      (despesa) => despesa.categoria === categoriaSelecionada,
    );
  }, [categoriaSelecionada]);

  return (
    <View>
      <Text style={styles.label}>Filtrar Despesas</Text>
      <Dropdown
        style={styles.dropdown}
        data={categorias}
        labelField="label"
        valueField="value"
        placeholder="Selecione..."
        value={categoriaSelecionada}
        onChange={(item) => {
          setCategoriaSelecionada(item.value);
        }}
      />
      <DespesaLista despesas={despesasFiltradas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 5,
  },
  dropdown: {
    height: 30,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
    fontWeight: "600",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default DropdownMenu;
