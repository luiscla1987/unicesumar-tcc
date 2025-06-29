import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USER_STORAGE_KEY = '@BakeryApp:user';

// Mock de usuários (em uma aplicação real, isso viria de um banco de dados)
const users: User[] = [
  {
    id: '1',
    name: 'Admin',
    phone: '11999999999',
    email: 'admin@example.com',
    username: 'admin',
    isAdmin: true
  }
];

export const signIn = async (username: string, password: string): Promise<User> => {
  // Verifica se é o admin
  if (username === 'admin' && password === 'senha123') {
    console.log('Login realizado com sucesso');
    return users[0];
  }

  // Em uma aplicação real, aqui seria feita a verificação com o backend
  throw new Error('Usuário ou senha inválidos');
};

export const signUp = async (userData: Omit<User, 'id' | 'isAdmin'>): Promise<User> => {
  // Validação do telefone
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(userData.phone)) {
    throw new Error('Telefone inválido');
  }

  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error('Email inválido');
  }

  // Verifica se o usuário já existe
  if (users.some(u => u.username === userData.username)) {
    throw new Error('Nome de usuário já existe');
  }

  // Em uma aplicação real, aqui seria feita a criação no backend
  const newUser: User = {
    id: String(users.length + 1),
    ...userData,
    isAdmin: false
  };

  users.push(newUser);
  return newUser;
};

export const signOut = async (): Promise<void> => {
  // Em uma aplicação real, aqui seria feita a limpeza de tokens, etc.
  return Promise.resolve();
};

export const getCurrentUser = async (): Promise<User | null> => {
  // Em uma aplicação real, aqui seria feita a verificação de tokens, etc.
  return null;
}; 