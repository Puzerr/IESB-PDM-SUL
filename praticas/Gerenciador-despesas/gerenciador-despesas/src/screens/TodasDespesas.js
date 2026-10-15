import { View } from "react-native";
import DespesaSaida from "../components/despesas/DespesaSaida";

function TodasDespesas() {
  const mockDespesas = [
    {
      id: "1",
      descricao: "Conta de luz",
      valor: 100.99,
      categoria: "Contas",
      data: new Date(2025, 2, 11),
    },
    {
      id: "2",
      descricao: "Conta de água",
      valor: 40.99,
      categoria: "Contas",
      data: new Date(2024, 4, 10),
    },
    {
      id: "3",
      descricao: "Mercado baratíssimo",
      valor: 675.98,
      categoria: "Alimentação",
      data: new Date(2025, 10, 6),
    },
    {
      id: "4",
      descricao: "Posto de Combustível Shell",
      valor: 120,
      categoria: "Transporte",
      data: new Date(2025, 10, 13),
    },
  ];

  return (
    <View>
      <DespesaSaida despesas={mockDespesas} />
    </View>
  );
}

export default TodasDespesas;
