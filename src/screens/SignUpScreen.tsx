import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const route = useRoute();
  const previousScreen = (route.params as any)?.previousScreen || 'Home';
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome');
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome de usuário');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // TODO: Implement signup logic here
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    }
  };

  const handleCancel = () => {
    navigation.navigate(previousScreen);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 