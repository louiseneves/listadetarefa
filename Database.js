import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./config";

export const Logins = async (email, senha) => {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado com sucesso");
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};

export const CadastrosLogin = async (email, senha) => {
  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso");
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};

export const Logout = async () => {
  try {
    await signOut(auth);
    alert("Logout realizado");
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};
