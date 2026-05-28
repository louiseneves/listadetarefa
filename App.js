import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

import AppTab from "./AppTab";
import AppAuth from "./AppAuth";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#036FFC" />
      </View>
    );
  }

  return (
    <>
      {currentUser ? <AppTab /> : <AppAuth />}
      <StatusBar style="light" />
    </>
  );
}
