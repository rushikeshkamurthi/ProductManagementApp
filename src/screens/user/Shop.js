import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import productStore from '../../store/productStore';
import {toJS} from 'mobx';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const ShopScreen = observer(({navigation}) => {
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isTileView, setIsTileView] = useState(true);

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  useEffect(() => {
    if (productStore.products?.products) {
      setFilteredProducts(productStore.products.products);
    }
  }, [productStore.products]);

  const getUniqueCategories = () => {
    const allProducts = productStore.products?.products || [];
    const uniqueCategories = [
      ...new Set(allProducts.map(product => product.category)),
    ];
    return uniqueCategories.map((cat, index) => ({
      id: index,
      name: cat,
      image: 'https://via.placeholder.com/100',
    }));
  };

  const increaseQuantity = item => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: prevCart[item.id]
        ? {...item, quantity: prevCart[item.id].quantity + 1}
        : {...item, quantity: 1},
    }));
  };

  const decreaseQuantity = item => {
    setCart(prevCart => {
      if (prevCart[item.id]?.quantity === 1) {
        const updatedCart = {...prevCart};
        delete updatedCart[item.id];
        return updatedCart;
      }
      return {
        ...prevCart,
        [item.id]: {...item, quantity: prevCart[item.id].quantity - 1},
      };
    });
  };

  const handleSearch = text => {
    setSearch(text);
    const products = productStore.products?.products || [];
    if (text === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  const filterByCategory = category => {
    setSelectedCategory(category);
    const products = productStore.products?.products || [];
    setFilteredProducts(products.filter(item => item.category === category));
  };

  const renderProduct = ({item}) => {
    const isTile = isTileView;

    return (
      <View style={[styles.productCard, isTile && styles.productTileCard]}>
        <Image
          source={{uri: item.image || 'https://via.placeholder.com/100'}}
          style={isTile ? styles.tileImage : styles.listImage}
        />
        <View style={[styles.details, isTile && styles.tileDetails]}>
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
    );
  };

  if (productStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Products...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBarStyle}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
        <View>
          <TouchableOpacity onPress={() => setIsTileView(!isTileView)}>
            <Ionicons
              name={isTileView ? 'list' : 'grid'}
              size={24}
              color="#007BFF"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Filter Chips */}
      {/* <ScrollView
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
      </ScrollView> */}
      {/* Categories */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}>
          {getUniqueCategories().map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => filterByCategory(category.name)}
              style={styles.categoryCard}>
              <Image
                source={{uri: category.image}}
                style={styles.categoryImage}
              />
              <View style={{padding: 10}}>
                <Text>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products */}
      <FlatList
        data={filteredProducts}
        key={isTileView ? 'tile' : 'list'}
        keyExtractor={item => item.id.toString()}
        numColumns={isTileView ? 2 : 1}
        renderItem={renderProduct}
        contentContainerStyle={{paddingBottom: 100}}
      />

      {/* Cart Button */}
      {Object.keys(cart).length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            navigation.navigate('OrderSummary', {
              cart: Object.values(JSON.parse(JSON.stringify(toJS(cart)))),
            })
          }>
          <Text style={styles.cartButtonText}>
            View Cart ({Object.values(cart).length})
          </Text>
        </TouchableOpacity>
      )}

      {/* Filter Modal */}
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
});

const styles = StyleSheet.create({
  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  searchBar: {
    flex: 1, // This makes the TextInput take all available space
    height: 40,
    color: '#000',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {flex: 1, padding: 15, backgroundColor: '#fff'},
  filterContainer: {flexDirection: 'row', marginBottom: 10},
  chip: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  chipText: {fontSize: 14},
  viewToggle: {
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {marginBottom: 10},
  categoryCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryImage: {width: 60, height: 60, borderRadius: 30},
  productCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginRight: 10,
  },
  productTileCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 50) / 2,
  },
  listImage: {width: 60, height: 60, borderRadius: 10},
  tileImage: {width: 100, height: 100, borderRadius: 10},
  details: {flex: 1, marginLeft: 15, justifyContent: 'center'},
  tileDetails: {marginLeft: 0, marginTop: 8, alignItems: 'center'},
  productName: {fontSize: 16, fontWeight: 'bold'},
  price: {fontSize: 14, color: '#EC5228', marginVertical: 5},
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  addButtonText: {color: '#fff', fontWeight: 'bold'},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  quantityText: {fontSize: 16, fontWeight: 'bold'},
  quantity: {fontSize: 16, marginHorizontal: 10},
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  cartButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  closeModal: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  closeModalText: {color: '#EC5228', fontWeight: 'bold'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ShopScreen;
