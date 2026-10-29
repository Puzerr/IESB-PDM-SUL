import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TasksContext = createContext(null);
const STORAGE_KEY = "@campus-tasks";

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        {
          ...action.payload,
          id: Date.now().toString(),
          done: false,
          createdAt: new Date().toISOString(),
        },
        ...state,
      ];
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

export function TasksContextProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  const addTask = (data) => dispatch({ type: "ADD", payload: data });

  const updateTask = (id, data) =>
    dispatch({ type: "UPDATE", payload: { id, data } });

  const deleteTask = (id) => dispatch({ type: "DELETE", payload: id });

  const toggleDone = (id) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    dispatch({
      type: "UPDATE",
      payload: { id, data: { done: !task.done } },
    });
  };

  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          dispatch({ type: "SET", payload: JSON.parse(json) });
        }
      } catch (error) {
        console.log("Erro ao carregar tarefas", error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleDone,
    isLoaded,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("Faltou o TasksContextProvider");
  }
  return ctx;
}
