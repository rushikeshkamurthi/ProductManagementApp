import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import productStore from '../store/productStore';

const CreateProductScreen = observer(({ navigation }) => {
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
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Product</Text>

      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          placeholder="Product Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <TextInput
          placeholder="Subcategory"
          placeholderTextColor="#888"
          value={subcategory}
          onChangeText={setSubcategory}
          style={styles.input}
        />
        <TextInput
          placeholder="Type"
          placeholderTextColor="#888"
          value={type}
          onChangeText={setType}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          placeholderTextColor="#888"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Shop ID"
          placeholderTextColor="#888"
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
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    paddingBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateProductScreen;
