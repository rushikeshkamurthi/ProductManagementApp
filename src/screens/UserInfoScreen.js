import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const UserInfoScreen = ({route}) => {
  const {user} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.username}</Text>
        <Text style={styles.profileAge}>20-30 Years Old</Text>
        <TouchableOpacity style={styles.friendButton}>
          <Text style={styles.friendButtonText}>Become Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.matchButton}>
          <Text style={styles.matchButtonText}>Invite to Team Match</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>User Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bio</Text>
          <Text style={styles.infoValue}>Hey there, I'm on Atlatik</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Role</Text>
          <Text style={styles.infoValue}>
            {user.roles.map(r => r.name.replace(/_/g, ' ')).join(', ')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Joined</Text>
          <Text style={styles.infoValue}>March 04, 2023</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>Alger, Canada</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Reviews</Text>
          <View style={styles.ratingContainer}>
            {Array.from({length: 5}).map((_, index) => (
              <Text key={index} style={styles.star}>
                {index < 3 ? '★' : '☆'}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileAge: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  friendButton: {
    backgroundColor: '#E5FFE5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  friendButtonText: {
    color: '#2ECC71',
    fontSize: 16,
  },
  matchButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  matchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    maxWidth: '60%',
    textAlign: 'right',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    color: '#FFD700',
  },
});

export default UserInfoScreen;
