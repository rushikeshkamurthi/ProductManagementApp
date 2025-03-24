import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingVertical: 12,
    paddingLeft:10,
    fontSize: 26,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    top: 0,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Add padding to content only
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007BFF',
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 15,

  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  terms:{
    color:"#007BFF"
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  signUpButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
