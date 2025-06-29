import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';
import { getProducts } from '../services/products';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FontAwesome } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { items, addToCart, total } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchText, selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleOrder = (product: Product) => {
    addToCart(product);
    navigation.navigate('OrderDetails', { product });
  };

  const getCategories = () => {
    return Array.from(new Set(products.map(product => product.category)));
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = '5547999767627';
    const message = 'Gostaria de mais informações sobre os produtos...';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('OrderDetails', { product: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
          {item.discountPercentage > 0 && (
            <Text style={styles.discountText}>
              {item.discountPercentage}% OFF
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleOrder(item)}
        >
          <Text style={styles.orderButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
        {user && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProduct', { product: item })}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Joelma Padaria</Text>
        <View style={styles.userContainer}>
          {user && (
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
              <Text style={styles.userName}>{user.name}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => navigation.navigate('OrderDetails' as never)}
          >
            <Text style={styles.cartButtonText}>🛒</Text>
            {items.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{items.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuContent}>
            {user ? (
              <>
                <View style={styles.userInfo}>
                  <Text style={styles.menuUserName}>{user.name}</Text>
                  <Text style={styles.menuUserEmail}>{user.email}</Text>
                </View>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setShowMenu(false);
                    navigation.navigate('OrderDetails' as never);
                  }}
                >
                  <Text style={styles.menuItemText}>
                    Carrinho ({items.length} itens)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleLogout}
                >
                  <Text style={styles.menuItemText}>Sair</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setShowMenu(false);
                    navigation.navigate('Login' as never);
                  }}
                >
                  <Text style={styles.menuItemText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setShowMenu(false);
                    navigation.navigate('SignUp' as never);
                  }}
                >
                  <Text style={styles.menuItemText}>Cadastrar</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.closeMenuButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produtos..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            !selectedCategory && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryText,
              !selectedCategory && styles.selectedCategoryText,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        {getCategories().map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productsList}
        />
      )}

      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={handleWhatsApp}
      >
        <Text style={styles.whatsappIcon}>💬</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4CAF50',
  },
  menuButton: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menuContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
  },
  userInfo: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuUserEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeMenuButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeMenuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#f44336',
    fontSize: 16,
    textAlign: 'center',
  },
  productsList: {
    padding: 15,
    flexGrow: 1,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginVertical: 10,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  discountText: {
    fontSize: 14,
    color: '#f44336',
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartButton: {
    marginLeft: 15,
    position: 'relative',
  },
  cartButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  whatsappButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#25D366',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whatsappIcon: {
    fontSize: 32,
  },
}); 