import { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
  FlatList,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useExpenses } from "../store/expenses-context";
import { Colors } from "../constants/theme";
import { CATEGORIES } from "../constants/categories";

function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const selectedExpense = expenses.find((e) => e.id === expenseId);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const [form, setForm] = useState({
    description: selectedExpense ? selectedExpense.description : "",
    amount: selectedExpense ? selectedExpense.amount.toString() : "",
    date: selectedExpense ? new Date(selectedExpense.date) : new Date(),
    category: selectedExpense ? selectedExpense.category : "",
  });

  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar despesa" : "Nova despesa",
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function handleChangeAmount(text) {
    const cleanText = text.replace(",", ".");
    if (/^\d*\.?\d{0,2}$/.test(cleanText)) {
      handleChange("amount", cleanText);
    }
  }

  function validate() {
    const newErrors = {};

    if (!form.description || form.description.trim().length < 3) {
      newErrors.description = "A descrição deve ter no mínimo 3 caracteres.";
    }

    const parsedAmount = parseFloat(form.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Informe um valor maior que zero.";
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (!form.date || new Date(form.date) > today) {
      newErrors.date = "A data não pode ser futura.";
    }

    if (!form.category) {
      newErrors.category = "A categoria é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    const expenseData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: new Date(form.date),
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function handleDelete() {
    const confirmAction = () => {
      deleteExpense(expenseId);
      navigation.goBack();
    };

    if (Platform.OS === "web") {
      if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
        confirmAction();
      }
    } else {
      Alert.alert(
        "Excluir Despesa",
        "Tem certeza que deseja excluir esta despesa?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", style: "destructive", onPress: confirmAction },
        ],
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.textPrimary }]}>
            Descrição
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                color: theme.textPrimary,
                borderColor: errors.description ? theme.danger : theme.border,
              },
            ]}
            value={form.description}
            onChangeText={(val) => handleChange("description", val)}
            placeholder="Ex: Almoço"
            placeholderTextColor={theme.textSecondary}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.textPrimary }]}>
            Valor (R$)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                color: theme.textPrimary,
                borderColor: errors.amount ? theme.danger : theme.border,
              },
            ]}
            keyboardType="decimal-pad"
            value={form.amount}
            onChangeText={handleChangeAmount}
            placeholder="0.00"
            placeholderTextColor={theme.textSecondary}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.textPrimary }]}>Data</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={
                form.date instanceof Date && !isNaN(form.date)
                  ? form.date.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                if (e.target.value) {
                  const [year, month, day] = e.target.value.split("-");
                  handleChange("date", new Date(year, month - 1, day));
                }
              }}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: `1px solid ${errors.date ? theme.danger : theme.border}`,
                backgroundColor: theme.inputBackground,
                color: theme.textPrimary,
                fontSize: "14px",
              }}
            />
          ) : (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.textPrimary,
                  borderColor: errors.date ? theme.danger : theme.border,
                },
              ]}
              value={form.date.toLocaleDateString("pt-BR")}
              editable={false}
            />
          )}
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.textPrimary }]}>
            Categoria
          </Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={[
              styles.input,
              styles.categoryPicker,
              {
                backgroundColor: theme.inputBackground,
                borderColor: errors.category ? theme.danger : theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: form.category ? theme.textPrimary : theme.textSecondary,
              }}
            >
              {form.category || "Selecione uma categoria"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={theme.textSecondary}
            />
          </Pressable>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        <Modal transparent animationType="slide" visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Selecione a Categoria
              </Text>
              <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.modalItem}
                    onPress={() => {
                      handleChange("category", item);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        { color: theme.textPrimary },
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
              <Pressable
                style={[styles.cancelBtn, { backgroundColor: theme.border }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: theme.textPrimary }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.actionsContainer}>
          <Pressable
            style={[
              styles.button,
              styles.saveButton,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>

          {isEditing && (
            <Pressable
              style={[
                styles.button,
                styles.deleteButton,
                { backgroundColor: theme.danger },
              ]}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Excluir</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  categoryPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  actionsContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  saveButton: {},
  deleteButton: {},
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalItemText: {
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default GerenciarDespesa;
