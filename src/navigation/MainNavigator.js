import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExternalAdminDashboard from '../screens/externaladmin/ExternalAdminDashboard';
import ExternalShopManagement from '../screens/externaladmin/ExternalShopManagement';
import ExternalUserManagement from '../screens/externaladmin/ExternalUserManagement';
import SubAdminDashboard from '../screens/subAdmin/SubAdminDashboard';
import SubAdminShopManagement from '../screens/subAdmin/SubAdminShopManagement';
import SubAdminUserManagement from '../screens/subAdmin/SubAdminUserManagement';
import UserDashboard from '../screens/user/UserDashboard';
import ShopDetails from '../screens/user/ShopDetails';
import ProductListings from '../screens/user/ProductListings';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AccountManagement from '../screens/admin/AccountManagement';
import ShopManagement from '../screens/admin/ShopManagement';
import ProductManagement from '../screens/admin/ProductManagement';
import AddEditUser from '../screens/admin/AddEditUser';
import AccountListScreen from '../screens/AccountListScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopScreen from '../screens/ShopScreen';
import CreateShopScreen from '../screens/CreateShopScreen';
import AdminUserManagement from '../screens/admin/AdminUserManagement';
import ProductList from '../components/ProductList';
import ProductScreen from '../screens/ProductScreen';
import Invetory from '../screens/subAdmin/Invetory';
import CreateProductScreen from '../screens/CreateProductScreen';
import UpdateProductScreen from '../screens/UpdateProductScreen';
import OrderSummary from '../screens/user/OrderSummary';
import PaymentScreen from '../screens/user/PaymentScreen';
import Shop from '../screens/user/Shop';
import ProductDetails from '../components/ProductDetails';
import MyShops from '../screens/user/MyShops';
import OrderDetailsScreen from '../screens/user/OrderDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SavedAddressesScreen from '../screens/SavedAddressesScreen';
import MyPaymentMethodsScreen from '../screens/MyPaymentMethodsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Users" component={AdminUserManagement} />
    <Tab.Screen name="Accounts" component={AccountManagement} />
    <Tab.Screen name="Shops" component={ShopManagement} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const ExternalAdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={ExternalAdminDashboard} />
    <Tab.Screen name="Shops" component={ExternalShopManagement} />
    <Tab.Screen name="Users" component={ExternalUserManagement} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const SubAdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={SubAdminDashboard} />
    <Tab.Screen name="Invetory" component={Invetory} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const UserTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={UserDashboard} />
    <Tab.Screen name="My Shop" component={MyShops} />
    <Tab.Screen name="Inventory" component={ProductList} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const roleMappings = {
  ROLE_ADMIN: 'admin',
  ROLE_INTERNAL_ADMIN: 'internal_admin',
  ROLE_EXTERNAL_ADMIN: 'external_admin',
  ROLE_EXTERNAL_SUB_ADMIN: 'external_sub_admin',
  ROLE_INTERNAL_SUB_ADMIN: 'internal_sub_admin',
  ROLE_EXTERNAL_USER: 'external_user',
};

const MainNavigator = ({user}) => {
  const userRole = user?.roles?.[0] ? roleMappings[user.roles[0]] : null;
  console.log('user', user);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!userRole ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : userRole === 'admin' || userRole === 'internal_admin' ? (
        <Stack.Screen name="Admin" component={AdminTabs} />
      ) : userRole === 'external_admin' ? (
        <Stack.Screen name="ExternalAdmin" component={ExternalAdminTabs} />
      ) : userRole === 'external_sub_admin' ||
        userRole === 'internal_sub_admin' ? (
        <Stack.Screen name="SubAdmin" component={SubAdminTabs} />
      ) : (
        <Stack.Screen name="User" component={UserTabs} />
      )}
      <Stack.Screen
        name="AddEditUser"
        component={AddEditUser}
        options={{title: 'Add / Edit User'}}
      />
      <Stack.Screen name="Accounts" component={AccountListScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="EditAccount" component={EditAccountScreen} />
      <Stack.Screen name="Shops" component={ShopScreen} />
      <Stack.Screen name="CreateShop" component={CreateShopScreen} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProductScreen}
        options={{title: 'Create Product'}}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProductScreen}
        options={{title: 'Update Product'}}
      />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="PaymentMethods" component={MyPaymentMethodsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
