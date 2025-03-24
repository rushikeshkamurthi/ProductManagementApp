import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {getCompanies} from '../api/companyApi';

export default function AccountScreen() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  return (
    <View>
      <Text>Companies</Text>
      <FlatList
        data={companies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
