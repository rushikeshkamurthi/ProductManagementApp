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
import UserManagement from '../screens/admin/UserManagement';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Users" component={UserManagement} />
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
    <Tab.Screen name="Shops" component={SubAdminShopManagement} />
    <Tab.Screen name="Users" component={SubAdminUserManagement} />
  </Tab.Navigator>
);

const UserTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={UserDashboard} />
    <Tab.Screen name="Shop Details" component={ShopDetails} />
    <Tab.Screen name="Products" component={ProductListings} />
  </Tab.Navigator>
);

const roleMappings = {
  ROLE_ADMIN: 'admin',
  ROLE_INTERNAL_ADMIN: 'internal_admin',
  ROLE_EXTERNAL_ADMIN: 'external_admin',
  ROLE_EXTERNAL_SUB_ADMIN: 'external_sub_admin',
  ROLE_INTERNAL_SUB_ADMIN: 'internal_sub_admin',
  ROLE_USER: 'user',
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
    </Stack.Navigator>
  );
};

export default MainNavigator;
