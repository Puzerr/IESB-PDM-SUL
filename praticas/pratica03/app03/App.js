import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import MetasList from "./components/MetasList";
import MetaInput from "./components/MetaInput";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionaMetaHandler(inputMeta) {
    const novaMeta = { id: Math.random().toString(), texto: inputMeta };
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>

    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionaMetaHandler} />
      <View style={styles.metaContainer}>
        <MetasList array={metas} onDeleteItem={deletarMetaHandler}/>
      </View>
    </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
  },
  metaContainer: {
    flex: 15,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
