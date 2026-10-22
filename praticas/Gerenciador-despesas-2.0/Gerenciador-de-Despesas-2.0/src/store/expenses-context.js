import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Contas",
  "Lazer",
  "Saúde",
  "Outros",
];

const STORAGE_KEY = "@expenses";

export const ExpensesContext = createContext({
  expenses: [],
  categories: [],
  addExpense: (expenseData) => {},
  updateExpense: (id, expenseData) => {},
  deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...action.payload.data, id: item.id }
          : item,
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData).map((e) => ({
            ...e,
            date: new Date(e.date),
          }));
          dispatch({ type: "SET", payload: parsedData });
        }
      } catch (error) {
        console.error("Erro ao carregar despesas:", error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expensesState));
      } catch (error) {
        console.error("Erro ao salvar despesas:", error);
      }
    }
    saveExpenses();
  }, [expensesState, isLoaded]);

  function addExpense(expenseData) {
    const newExpense = {
      ...expenseData,
      id: Math.random().toString() + new Date().getTime().toString(),
    };
    dispatch({ type: "ADD", payload: newExpense });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        categories: DEFAULT_CATEGORIES,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      "useExpenses deve ser usado dentro de um ExpensesContextProvider",
    );
  }
  return context;
}
