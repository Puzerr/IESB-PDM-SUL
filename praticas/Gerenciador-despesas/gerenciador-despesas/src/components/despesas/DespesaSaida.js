import { View } from "react-native";
import DespesaSumario from "./DespesaSumario";
import DespesaLista from "./DespesaLista";
import DropdownMenu from "../DropdownMenu";

function DespesaSaida({ despesas, periodo }) {
  return (
    <View>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DropdownMenu despesas={despesas} />
    </View>
  );
}

export default DespesaSaida;
