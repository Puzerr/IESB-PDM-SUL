import { useState, useEffect, StrictMode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import CompromissosInput from "./components/CompromissosInput";
import CompromissosList from "./components/CompromissosList";
import Header from "./components/Header";

const rotinasDB = createAsyncStorage("rotinasDB");

export default function App() {
  const [listaRotina, setListaRotina] = useState([]);

  useEffect(() => {
    buscarRotinas();
  }, []);

  async function buscarRotinas() {
    try {
      const resultado = await rotinasDB.getItem("lista_rotinas");
      if (resultado != null) {
        setListaRotina(JSON.parse(resultado));
      }
    } catch (error) {
      console.error("Deu ruim ao buscar...", error.message);
    }
  }

  async function handleAdicionarRotina(novaRotina) {
    try {
      const novasRotinas = [...listaRotina, novaRotina];
      setListaRotina(novasRotinas);

      await rotinasDB.setItem("lista_rotinas", JSON.stringify(novasRotinas));
    } catch (error) {
      console.error("Deu ruim ao adicionar...", error.message);
    }
  }

  async function handleRemoverRotina(idRotina) {
    try {
      const resultado = listaRotina.filter((rotina) => rotina.id !== idRotina);
      setListaRotina(resultado);

      await rotinasDB.setItem("lista_rotinas", JSON.stringify(listaRotina));
    } catch (error) {
      console.error("Deu ruim ao remover...", error.message);
    }
  }

  return (
    <StrictMode>
      <SafeAreaProvider>
        <SafeAreaView>
          <Header />
          <CompromissosInput
            salvarRotina={handleAdicionarRotina}
            />
          <CompromissosList lista={listaRotina} apagarRotina={handleRemoverRotina}/>
        </SafeAreaView>
      </SafeAreaProvider>
    </StrictMode>
  );
}
