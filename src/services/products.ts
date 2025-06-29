import { Product } from '../types';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pão Francês',
    description: 'Pão francês tradicional e crocante, feito com farinha de trigo especial',
    price: 0.50,
    expirationDate: '2024-03-25',
    discountPercentage: 30,
    imageUrl: 'https://img.freepik.com/fotos-gratis/pao-frances-fresco-isolado_219193-3575.jpg',
    category: 'Pães',
    quantity: 50
  },
  {
    id: '2',
    name: 'Bolo de Chocolate',
    description: 'Bolo de chocolate com cobertura de ganache e raspas de chocolate',
    price: 25.00,
    expirationDate: '2024-03-24',
    discountPercentage: 40,
    imageUrl: 'https://img.freepik.com/fotos-gratis/bolo-de-chocolate-com-cobertura-de-chocolate_140725-2720.jpg',
    category: 'Bolos',
    quantity: 10
  },
  {
    id: '3',
    name: 'Croissant',
    description: 'Croissant folhado tradicional com manteiga francesa',
    price: 5.00,
    expirationDate: '2024-03-24',
    discountPercentage: 25,
    imageUrl: 'https://img.freepik.com/fotos-gratis/croissant-fresco-isolado_219193-3574.jpg',
    category: 'Pães Especiais',
    quantity: 15
  },
  {
    id: '4',
    name: 'Pão de Queijo',
    description: 'Pão de queijo mineiro tradicional, feito com queijo canastra',
    price: 2.50,
    expirationDate: '2024-03-23',
    discountPercentage: 20,
    imageUrl: 'https://img.freepik.com/fotos-gratis/pao-de-queijo-fresco-isolado_219193-3576.jpg',
    category: 'Salgados',
    quantity: 30
  },
  {
    id: '5',
    name: 'Torta de Frango',
    description: 'Torta de frango com massa folhada e recheio cremoso',
    price: 8.00,
    expirationDate: '2024-03-23',
    discountPercentage: 10,
    imageUrl: 'https://img.freepik.com/fotos-gratis/torta-de-frango-isolada_219193-3578.jpg',
    category: 'Salgados',
    quantity: 12
  },
  {
    id: '6',
    name: 'Sonho',
    description: 'Sonho recheado com creme de baunilha e cobertura de chocolate',
    price: 3.50,
    expirationDate: '2024-03-23',
    discountPercentage: 15,
    imageUrl: 'https://img.freepik.com/fotos-gratis/sonho-doce-isolado_219193-3577.jpg',
    category: 'Doces',
    quantity: 20
  },
  {
    id: '7',
    name: 'Baguete',
    description: 'Baguete francesa tradicional, crocante por fora e macia por dentro',
    price: 4.00,
    expirationDate: '2024-03-24',
    discountPercentage: 20,
    imageUrl: 'https://img.freepik.com/fotos-gratis/baguete-francesa-isolada_219193-3579.jpg',
    category: 'Pães',
    quantity: 25
  },
  {
    id: '8',
    name: 'Bolo de Cenoura',
    description: 'Bolo de cenoura com cobertura de chocolate',
    price: 22.00,
    expirationDate: '2024-03-24',
    discountPercentage: 35,
    imageUrl: 'https://img.freepik.com/fotos-gratis/bolo-de-cenoura-com-cobertura-de-chocolate_140725-2721.jpg',
    category: 'Bolos',
    quantity: 8
  },
  {
    id: '9',
    name: 'Coxinha',
    description: 'Coxinha de frango com catupiry',
    price: 3.50,
    expirationDate: '2024-03-23',
    discountPercentage: 30,
    imageUrl: 'https://via.placeholder.com/300x200?text=Coxinha',
    category: 'Salgados',
    quantity: 40
  },
  {
    id: '10',
    name: 'Pão de Mel',
    description: 'Pão de mel tradicional com cobertura de chocolate',
    price: 6.00,
    expirationDate: '2024-03-25',
    discountPercentage: 25,
    imageUrl: 'https://via.placeholder.com/300x200?text=Pão+Mel',
    category: 'Doces',
    quantity: 20
  }
];

export const getProducts = async (): Promise<Product[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Erro ao carregar produtos');
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.find(product => product.id === id) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Erro ao carregar produto');
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(product => product.category === category);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Erro ao carregar produtos por categoria');
  }
}; 