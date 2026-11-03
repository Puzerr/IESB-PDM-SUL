import { View, Text, StyleSheet } from "react-native";
import { useState, useMemo } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DespesaLista from "./despesas/DespesaLista";

import { CATEGORIES } from "../constants/categories";

function DropdownMenu({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categoriasDropdown = useMemo(() => {
    const opcoes = CATEGORIES.map((cat) => ({ label: cat, value: cat }));
    return [{ label: "Todas", value: "Todas" }, ...opcoes];
  }, []);

  const despesasFiltradas = useMemo(() => {
    if (categoriaSelecionada === "Todas") {
      return despesas;
    }
    return despesas.filter(
      (despesa) => despesa.category === categoriaSelecionada
    );
  }, [despesas, categoriaSelecionada]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar Despesas</Text>
      <Dropdown
        style={styles.dropdown}
        data={categoriasDropdown}
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
});

export default DropdownMenu;