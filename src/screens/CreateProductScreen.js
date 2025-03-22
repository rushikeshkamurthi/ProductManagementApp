import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import productStore from '../store/productStore';

const CreateProductScreen = observer(({navigation}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [shopId, setShopId] = useState('');

  const handleCreateProduct = async () => {
    if (!name || !category || !subcategory || !type || !price || !shopId) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    await productStore.createProduct({
      name,
      category,
      subcategory,
      type,
      price: parseFloat(price),
      shopId,
    });

    if (productStore.error) {
      Alert.alert('Error', productStore.error);
    } else {
      Alert.alert('Success', 'Product created successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>
        Create Product
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Subcategory"
        value={subcategory}
        onChangeText={setSubcategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Type"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Shop ID"
        value={shopId}
        onChangeText={setShopId}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateProduct}
        disabled={productStore.loading}>
        {productStore.loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Create</Text>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: 'white', fontSize: 16},
};

export default CreateProductScreen;
