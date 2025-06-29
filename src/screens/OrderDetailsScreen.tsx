import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type OrderDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const OrderDetailsScreen = () => {
  const navigation = useNavigation<OrderDetailsScreenNavigationProp>();
  const { items, total, clearCart } = useCart();

  const handleFinishOrder = () => {
    // Navega para a tela de login
    navigation.navigate('Login' as never);
  };

  const handleContinueShopping = () => {
    navigation.navigate('Home' as never);
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancelar Pedido',
      'Tem certeza que deseja cancelar este pedido?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            clearCart();
            navigation.navigate('Home' as never);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Seu Pedido</Text>
        
        {items.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
            <TouchableOpacity
              style={[styles.button, styles.continueButton]}
              onPress={handleContinueShopping}
            >
              <Text style={styles.buttonText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {items.map((item) => (
              <View key={item.product.id} style={styles.itemContainer}>
                <Image
                  source={{ uri: item.product.imageUrl }}
                  style={styles.productImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
                  <Text style={styles.price}>
                    R$ {(item.product.price * (1 - item.product.discountPercentage / 100) * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.continueButton]}
                onPress={handleContinueShopping}
              >
                <Text style={styles.buttonText}>Continuar Comprando</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancelOrder}
              >
                <Text style={styles.buttonText}>Cancelar Pedido</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.finishButton]}
                onPress={handleFinishOrder}
              >
                <Text style={styles.buttonText}>Finalizar Pedido</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonsContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
}); 