import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Header from "./components/Header";
import InserirDisciplinas from "./components/InserirDisciplinas";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Header />
          <InserirDisciplinas />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
