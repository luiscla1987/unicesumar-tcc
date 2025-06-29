import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/products';

export const AdminScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.description || !formData.price) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, newProduct);
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        await addProduct(newProduct);
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
      });
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o produto');
      console.error(err);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl || '',
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(productId);
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              loadProducts();
            } catch (err) {
              Alert.alert('Erro', 'Ocorreu um erro ao excluir o produto');
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
    });
    setEditingProduct(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Administração de Produtos</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="URL da imagem (opcional)"
            value={formData.imageUrl}
            onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddProduct}
            >
              <Text style={styles.buttonText}>
                {editingProduct ? 'Atualizar' : 'Adicionar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productsList}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando produtos...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <Image
                  source={{ uri: product.imageUrl || 'https://via.placeholder.com/150' }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>
                    R$ {product.price.toFixed(2)}
                  </Text>
                  <Text style={styles.productDescription}>
                    {product.description}
                  </Text>
                </View>
                <View style={styles.productActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditProduct(product)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProduct(product.id)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
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
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productsList: {
    padding: 20,
  },
  productItem: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  productActions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#f44336',
    marginTop: 20,
  },
}); 