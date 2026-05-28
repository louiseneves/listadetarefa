import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Logins } from './Database';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async () => {
    if (!email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Digite um email válido');
      return;
    }

    try {
      setLoading(true);
      await Logins(email, senha);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <View style={styles.view}>
        <Text>Email</Text>

        <TextInput
          style={styles.email}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.view}>
        <Text>Senha</Text>

        <TextInput
          style={styles.email}
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.botao} onPress={handleOnSubmit}>
          <Text style={styles.btxt}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>Eu não tenho uma conta?</Text>

        <Text
          style={styles.ftxt}
          onPress={() => navigation.navigate('CadastroLogin')}
        >
          Criar conta
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 32,
  },
  view: {
    width: '100%',
    marginBottom: 20,
  },
  email: {
    padding: 14,
    borderColor: '#ccc',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  botao: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#036FFC',
    borderRadius: 10,
    marginTop: 20,
  },
  btxt: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  ftxt: {
    marginLeft: 4,
    color: '#036FFC',
    fontWeight: 'bold',
  },
});