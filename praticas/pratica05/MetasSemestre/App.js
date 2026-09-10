import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import InputMeta from "./components/InputMeta";
import ExibirMeta from "./components/ExibirMeta";

const metaStorage = createAsyncStorage("MetasDB");

export default function App() {
  const [listaMetas, setListaMetas] = useState([]);

  useEffect(() => {
    buscarMetas();
  }, []);

  async function buscarMetas() {
    try {
      const resultado = await metaStorage.getItem("lista_semestre");
      if (resultado !== null) {
        setListaMetas(JSON.parse(resultado));
      }
    } catch (e) {
      console.error("Erro ao buscar metas:", e);
    }
  }

  async function handleAdicionarMeta(novaMeta) {
    try {
      const novaLista = [...listaMetas, novaMeta];
      setListaMetas(novaLista);
      
      await metaStorage.setItem("lista_semestre", JSON.stringify(novaLista));
    } catch (e) {
      console.error("Erro ao salvar a nova meta:", e);
    }
  }

  async function handleExcluirMeta(idParaRemover) {
    try {
      const novaLista = listaMetas.filter((meta) => meta.id !== idParaRemover);
      setListaMetas(novaLista);
      
      await metaStorage.setItem("lista_semestre", JSON.stringify(novaLista));
    } catch (e) {
      console.error("Erro ao excluir a meta:", e);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <InputMeta onSalvarMeta={handleAdicionarMeta} />
        <ExibirMeta metas={listaMetas} onExcluir={handleExcluirMeta} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});