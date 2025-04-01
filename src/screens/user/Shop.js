import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

const categories = [
  {id: 1, name: 'Fruits', image: 'https://via.placeholder.com/100'},
  {id: 2, name: 'Vegetables', image: 'https://via.placeholder.com/100'},
  {id: 3, name: 'Dairy', image: 'https://via.placeholder.com/100'},
  {id: 4, name: 'Beverages', image: 'https://via.placeholder.com/100'},
  {id: 5, name: 'Grains', image: 'https://via.placeholder.com/100'},
  {id: 6, name: 'Misc', image: 'https://via.placeholder.com/100'},
];

const dummyProducts = [
  {
    id: 1,
    name: 'Apples',
    price: 50,
    image: 'https://via.placeholder.com/100',
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Bananas',
    price: 30,
    image: 'https://via.placeholder.com/100',
    category: 'Fruits',
  },
  {
    id: 3,
    name: 'Tomatoes',
    price: 40,
    image: 'https://via.placeholder.com/100',
    category: 'Vegetables',
  },
  {
    id: 4,
    name: 'Potatoes',
    price: 25,
    image: 'https://via.placeholder.com/100',
    category: 'Vegetables',
  },
];

const ShopScreen = ({navigation}) => {
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  // Add item to cart or increase quantity
  const increaseQuantity = item => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: prevCart[item.id]
        ? {...item, quantity: prevCart[item.id].quantity + 1}
        : {...item, quantity: 1},
    }));
  };

  // Decrease item quantity
  const decreaseQuantity = item => {
    setCart(prevCart => {
      if (prevCart[item.id]?.quantity === 1) {
        const updatedCart = {...prevCart};
        delete updatedCart[item.id]; // Remove item if quantity is 0
        return updatedCart;
      }
      return {
        ...prevCart,
        [item.id]: {...item, quantity: prevCart[item.id].quantity - 1},
      };
    });
  };
  // Add to Cart
  const addToCart = item => {
    setCart([...cart, item]);
  };

  // Search Handler
  const handleSearch = text => {
    setSearch(text);
    if (text === '') {
      setFilteredProducts(dummyProducts);
    } else {
      setFilteredProducts(
        dummyProducts.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  // Category Filter
  const filterByCategory = category => {
    setSelectedCategory(category);
    setFilteredProducts(
      dummyProducts.filter(item => item.category === category),
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
          placeholderTextColor="#000"
        placeholder="Search for products..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        {['Popular', 'Discounts', 'In Stock'].map((filter, index) => (
          <TouchableOpacity key={index} style={styles.chip}>
            <Text style={styles.chipText}>{filter}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.chip}>
          <Text style={styles.chipText}>More Filters</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => filterByCategory(category.name)}
            style={styles.categoryCard}>
            <Image
              source={{uri: category.image}}
              style={styles.categoryImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>

              {cart[item.id] ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item)}
                    style={styles.quantityButton}>
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{cart[item.id].quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item)}
                    style={styles.quantityButton}>
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => increaseQuantity(item)}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />

      {/* Cart Button */}
      {/* Cart Button */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() =>
          navigation.navigate('OrderSummary', {cart: Object.values(cart)})
        }>
        <Text style={styles.cartButtonText}>
          View Cart ({Object.values(cart).length})
        </Text>
      </TouchableOpacity>

      {/* Advanced Filter Modal */}
      <Modal visible={isFilterModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Advanced Filters</Text>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(false)}
            style={styles.closeModal}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  searchBar: {
    height: 40,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  paddingLeft: 15,
  
  marginBottom: 10,
  color: '#000', 
  },
  filterContainer: {flexDirection: 'row', marginBottom: 10, maxHeight: 32},
  chip: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 6,
    maxHeight: 30,
    paddingHorizontal: 10,
    marginRight: 12,
    borderRadius: 20,
  },
  chipText: {fontSize: 14},
  categoryContainer: {
    marginBottom: 10,
  },
  categoryCard: {
    width: width / 4 - 20,
    height: width / 4 - 20,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 1,
  },
  categoryImage: {width: 80, height: 80, borderRadius: 40},
  categoryText: {marginTop: 0, fontSize: 12, fontWeight: 'bold'},
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {width: 60, height: 60, borderRadius: 10},
  details: {flex: 1, marginLeft: 15},
  productName: {fontSize: 18, fontWeight: 'bold'},
  price: {fontSize: 16, color: '#EC5228', marginVertical: 5},
  addButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {color: 'white', fontSize: 16},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {backgroundColor: '#ddd', padding: 8, borderRadius: 5},
  quantityText: {fontSize: 16, fontWeight: 'bold'},
  quantity: {fontSize: 18, marginHorizontal: 10},
  cartButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  closeModal: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  closeModalText: {fontSize: 16, fontWeight: 'bold', color: '#EC5228'},
});

export default ShopScreen;
