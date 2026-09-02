import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { plchldInserirDisciplina, btnInserirDisciplina } from "../labels";
import { ScrollView } from "react-native";

function InserirDisciplinas() {
  const [disciplina, setDisciplina] = useState("");
  const [database, setDatabase] = useState([]);

  function handleDefinirDisciplina(text) {
    setDisciplina(text);
  }

  function handleInserirDisciplina() {
    const novaDisciplina = disciplina;
    setDatabase([...database, { nome: novaDisciplina }]);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.disciplinaInput}
          placeholder={plchldInserirDisciplina}
          onChangeText={(text) => handleDefinirDisciplina(text)}
        />
        <Button
          style={styles.buttonInput}
          title={btnInserirDisciplina}
          onPress={() => {
            (handleInserirDisciplina(), console.log(database));
          }}
        />
      </View>
      <Text style={styles.tituloLista}>Minhas Disciplinas</Text>
      <View>
        {database.map((disciplina, index) => (
          <ScrollView>
            <View key={index} style={{ paddingTop: "5px" }}>
              <Text style={styles.disciplinaBlock}>{disciplina.nome}</Text>
            </View>
          </ScrollView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingInline: "5%",
  },
  disciplinaInput: {
    flex: 1,
    width: "70%",
    fontSize: "16px",
    borderColor: "#739ed0",
    borderWidth: "2px",
    borderRadius: "2%",
    paddingLeft: "3px",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: "7%",
  },
  buttonInput: { width: "30%" },
  tituloLista: { alignSelf: "center", marginTop: "5%", fontSize: "20px" },
  disciplinaBlock: {
    fontSize: "16px",
    backgroundColor: "#848080",
    borderWidth: "10px",
    borderColor: "#848080",
    borderRadius: "2%",
  },
});

export default InserirDisciplinas;
