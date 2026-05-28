import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { db, updateDoc, doc } from "./config";
export default function AppEdit({ route, navigation }) {
  const [editedTask, setEditedTask] = useState(route?.params?.item || "");
  const taskId = route?.params?.id;
  function handleTarefaChange(editedTask) {
    setEditedTask(editedTask);
  }
  const handleEditPress = async () => {
    try {
      if (!taskId) {
        alert("Tarefa inválida");
        return;
      }
      if (!editedTask.trim()) {
  alert("Digite uma tarefa");
  return;
}
      await updateDoc(doc(db, "tarefa", taskId), {
        tarefa: editedTask,
      });
      route?.params?.ButtonPress?.();
      navigation.navigate("Lista");
      console.log(editedTask);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };
  return (
    <SafeAreaView
  style={[
    styles.container,
    { paddingTop: StatusBar.currentHeight }
  ]}
>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          elevation: 4,
          paddingHorizontal: 20,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 20, padding: 20 }}>Editar</Text>
        <Text
          style={{ fontSize: 20, padding: 20, color: "red" }}
          onPress={() => {
            navigation.navigate("Lista");
          }}
        >
          Cancelar
        </Text>
      </View>
      <Text style={styles.title}>Tarefa</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={editedTask}
          onChangeText={handleTarefaChange}
          placeholder="Tarefa"
        />
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#036FFC",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: "90%",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "stretch",
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#036FFC",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
