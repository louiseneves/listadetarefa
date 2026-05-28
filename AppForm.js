import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { addDoc, db, collection, auth } from "./config";

export default function AppForm({ route, navigation }) {
  const [tarefa, setTarefa] = useState("");
  const [editMode, setEditMode] = useState(route?.params?.edit ?? false);
  let id = route?.params && route?.params?.edit ? route.params.id : undefined;
  useEffect(() => {
    if (!id) return;
    setTarefa(route.params.item);
    setEditMode(route.params.edit);
  }, [route?.params]);
  function handleTarefaChange(tarefa) {
    setTarefa(tarefa);
  }

  async function handleButtonPress() {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Faça login novamente");
        return;
      }

      if (!editMode) {
        if (!tarefa.trim()) {
          alert("Digite uma tarefa");
          return;
        }
        const docRef = await addDoc(collection(db, "tarefa"), {
          tarefa: tarefa,
          userId: user.uid,
        });
        setTarefa("");
        setEditMode(false);
        route?.params?.ButtonPress?.();
        navigation.navigate("Lista");
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
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
        <Text style={{ fontSize: 20, padding: 20 }}>Cadastro</Text>
        <Text
          style={{ fontSize: 20, padding: 20, color: "red" }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancelar
        </Text>
      </View>
      <Text style={styles.title}>Tarefa</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={tarefa}
          onChangeText={handleTarefaChange}
          placeholder="Tarefa"
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
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
