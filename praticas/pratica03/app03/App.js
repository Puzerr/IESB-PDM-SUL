import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas tarefas</Text>
      <TextInput placeholder="Digite uma tarefa..." />
      <TouchableOpacity>
        <Text style={{ paddingInline: 32 }}>Add</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.card}>
          <Text>Estudar "Programação para Dispositivos Móveis"</Text>
          <TouchableOpacity>
            <Text style={{ paddingInline: 32 }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text>Construir ícones de usuários</Text>
          <TouchableOpacity>
            <Text style={{ paddingInline: 32 }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text>Pensar em mais tarefas...</Text>
          <TouchableOpacity>
            <Text style={{ paddingInline: 32 }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titulo: {
    fontWeight: 600,
  },
  card: {
    backgroundColor: "#00FFFF",
    borderRadius: 2,
    paddingInline: 10,
    marginBottom: 5,
  },
});

export default App;
