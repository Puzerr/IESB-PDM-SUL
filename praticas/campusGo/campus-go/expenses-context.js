import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpensesContext = createContext(null);
const STORAGE_KEY = "@expenses";

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: Date.now().toString() }, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.data }
          : item,
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  const addExpense = (data) => dispatch({ type: "ADD", payload: data });

  const updateExpense = (id, data) =>
    dispatch({ type: "UPDATE", payload: { id, data } });

  const deleteExpense = (id) => dispatch({ type: "DELETE", payload: id });

  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const saved = JSON.parse(json).map((item) => ({
            ...item,
            date: new Date(item.date),
          }));
          dispatch({ type: "SET", payload: saved });
        }
      } catch (error) {
        console.log("Erro ao carregar despesas", error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, isLoaded]);

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoaded,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) {
    throw new Error("Faltou o ExpensesContextProvider");
  }
  return ctx;
}
