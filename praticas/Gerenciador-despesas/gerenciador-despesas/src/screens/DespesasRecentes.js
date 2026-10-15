import { Text } from "react-native";
import DespesaSaida from "../components/despesas/DespesaSaida";

function DespesasRecentes() {
  function filtrarUltimosSeteDias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesas) => {
      return despesas.data >= seteDiasAtras && despesas.data <= hoje;
    });
  }

  const mockDespesas = [
    {
      id: "1",
      descricao: "Conta de luz",
      valor: 100.99,
      categoria: "Contas",
      data: new Date(2025, 10, 11),
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
    <DespesaSaida
      despesas={filtrarUltimosSeteDias(mockDespesas)}
      periodo={"Ultimos 7 dias"}
    />
  );
}

export default DespesasRecentes;
