import { FlatList, Pressable, Text, View, StyleSheet } from "react-native";
import labels from "../labels";

function CompromissosList({ lista, apagarRotina }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tituloLista}>{labels.plchldTituloLista}</Text>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onLongPress={() =>  apagarRotina(item.id)} delayLongPress={500}>
            <View style={styles.blocoLista}>
              <Text style={styles.nomeRotina}>
                Descrição: {item.nomeRotina}
              </Text>
              <Text style={styles.criadaEm}>Criada em: {item.criadaEm}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  tituloLista: {
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#bebbbb",
    paddingBlock: 12,
  },
  blocoLista: {
    marginTop: 16,
    width: "90%",
    margin: "auto",
    backgroundColor: "#b1dbe5",
    padding: 10,
    borderRadius: 6,
  },
  nomeRotina: {
    fontSize: 20,
    textAlign: "center",
    width: "fit-content",
    marginBottom: 5,
  },
  criadaEm: {
    fontSize: 20,
    textAlign: "center",
    width: "fit-content",
  },
});

export default CompromissosList;
