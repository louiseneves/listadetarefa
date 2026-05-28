import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";

import AppItem from "./Componente";
import { Logout } from "./Database";

import { db, collection, getDocs, auth, where, query } from "./config";

export default function AppList({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleButtonPress();
  }, []);

  async function handleButtonPress() {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Usuário não autenticado");
        return;
      }

      const taskRef = collection(db, "tarefa");

      const userTaskQuery = query(taskRef, where("userId", "==", user.uid));

      const querySnapshot = await getDocs(userTaskQuery);

      const tarefa = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(tarefa);
    } catch (error) {
      alert("Erro ao carregar tarefas");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: StatusBar.currentHeight }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={Logout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Cadastro", {
              ButtonPress: handleButtonPress,
            })
          }
        >
          <Text style={styles.add}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />

      <Text style={styles.title}>Lista de Tarefas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.itemsContainer}
        >
          {items.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma tarefa cadastrada</Text>
          ) : (
            items.map((item) => {
              return (
                <AppItem
                  key={item.id}
                  id={item.id}
                  item={item.tarefa}
                  navigation={navigation}
                  ButtonPress={handleButtonPress}
                />
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#036FFC",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    width: "100%",
    paddingVertical: 16,
  },
  logout: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  add: {
    fontSize: 18,
    color: "#036FFC",
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
  itemsContainer: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
  },
});
