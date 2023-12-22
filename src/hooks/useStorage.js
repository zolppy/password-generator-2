import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  /* Buscar itens salvos */
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);

      return JSON.parse(passwords) || [];
    } catch (error) {
      console.error("Erro ao recuperar itens:", error);
      return [];
    }
  }

  /* Salvar um item no armazenamento */
  const saveItem = async (key, value) => {
    try {
      let passwords = await getItem(key, value);

      passwords.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  }

  /* Remover um item do armazenamento */
  const removeItem = async (key, item) => {
    try {
      const passwords = await getItem(key);
      const myPasswords = passwords.filter(password => password !== item);

      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));

      return myPasswords;
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  }

  return {
    getItem,
    saveItem,
    removeItem
  }
}

export default useStorage;