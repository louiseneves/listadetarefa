import React, { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CadastrosLogin } from './Database';

const CadastroLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async () => {
    if (!email || !senha || !confirmaSenha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Digite um email válido');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert('As senhas não correspondem');
      return;
    }

    try {
      setLoading(true);
      await CadastrosLogin(email, senha);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Usuário</Text>

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
      </View>

      <View style={styles.view}>
        <Text>Confirmar Senha</Text>

        <TextInput
          style={styles.email}
          onChangeText={setConfirmaSenha}
          value={confirmaSenha}
          secureTextEntry={true}
        />

          <TouchableOpacity style={styles.botao} onPress={handleOnSubmit}>
          <Text style={styles.btxt}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>Já tenho uma conta?</Text>

        <Text
          style={styles.ftxt}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </View>
    </View>
  );
};

export default CadastroLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
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
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
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