import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions, Image } from 'react-native';
import { TextInput as RNPTextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckBox from '../components/CustomCheckBox';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const checkStoredCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem('emailOrUsername');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail && storedPassword) {
        setEmailOrUsername(storedEmail);
        setPassword(storedPassword);
        onLoginPress(storedEmail, storedPassword);
      }
    };
    checkStoredCredentials();
  }, []);

  const onLoginPress = async (emailInput?: string, passwordInput?: string) => {
    try {
      let email = emailInput || emailOrUsername;
      let pass = passwordInput || password;

      if (!isValidEmail(emailOrUsername)) {
        const userQuery = query(collection(db, 'users'), where('username', '==', emailOrUsername));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          email = userData.email;
        } else {
          throw new Error('User not found');
        }
      }

      await signInWithEmailAndPassword(auth, email, pass);
      if (rememberMe) {
        await AsyncStorage.setItem('emailOrUsername', emailOrUsername);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('emailOrUsername');
        await AsyncStorage.removeItem('password');
      }
      setEmailOrUsername('');
      setPassword('');
      navigation.navigate('MainTabs', { screen: 'Home', params: { screen: 'Homepage1' } });
    } catch (error: any) {
      setError(getErrorMessage(error));
    }
  };

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'Invalid email or password.';
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const onGoogleLoginPress = () => {
    // Handle Google login here
  };

  const onFacebookLoginPress = () => {
    // Handle Facebook login here
  };

  const onXLoginPress = () => {
    // Handle X (Twitter) login here
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const onForgotPasswordPress = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../assets/campuscare-logo-1.png')}
          />
          <View style={styles.formContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <RNPTextInput
              style={styles.input}
              label="Email"
              placeholder="Email"
              mode="outlined"
              value={emailOrUsername}
              onChangeText={setEmailOrUsername}
              placeholderTextColor="#717171"
              outlineColor="#1F75FE"
              activeOutlineColor="#085ea9"
              keyboardType="default"
              theme={{
                fonts: { regular: { fontFamily: 'Poppins-Regular', fontWeight: '300' } },
                colors: { text: '#818181' },
              }}
            />
            <RNPTextInput
              style={styles.input}
              label="Password"
              placeholder="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#717171"
              outlineColor="#1F75FE"
              activeOutlineColor="#133e85"
              theme={{
                fonts: { regular: { fontFamily: 'Poppins-Regular', fontWeight: '300' } },
                colors: { text: '#878787' },
              }}
            />
            <View style={styles.rememberMeContainer}>
              <CustomCheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                label="Remember Me"
              />
            </View>
            <Pressable onPress={onForgotPasswordPress}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
            <LinearGradient
              colors={["#318CE7", "#1F75FE"]}
              style={styles.loginButton}
            >
              <Pressable style={styles.pressable} onPress={() => onLoginPress()}>
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
            </LinearGradient>
          </View>
          <Text style={styles.orLoginWith}>Or Login with</Text>
          <View style={styles.socialMediaLogin}>
            <Pressable onPress={onGoogleLoginPress}>
              <FontAwesome name="google" size={responsiveFontSize(7)} color="#DB4437" />
            </Pressable>
            <Pressable onPress={onFacebookLoginPress}>
              <FontAwesome name="facebook" size={responsiveFontSize(7)} color="#3b5998" />
            </Pressable>
            <Pressable onPress={onXLoginPress}>
              <FontAwesome name="twitter" size={responsiveFontSize(7)} color="#1DA1F2" />
            </Pressable>
          </View>
          <View style={styles.dontHaveAnContainer}>
            <Text style={styles.dontHaveAn}>Don't have an account yet?</Text>
            <Pressable style={styles.signUp} onPress={onSignUpPress}>
              <Text style={styles.signUpBtn}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveHeight(17),
    marginBottom: responsiveHeight(2),
  },
  formContainer: {
    width: responsiveWidth(80),
  },
  input: {
    marginBottom: responsiveHeight(2),
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  rememberMeText: {
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Poppins-Regular',
    color: '#717171',
  },
  forgotPassword: {
    color: '#1F75FE',
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
  },
  loginButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: responsiveHeight(2),
  },
  pressable: {
    padding: responsiveWidth(3),
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: responsiveFontSize(5),
    fontFamily: 'Poppins-Bold',
  },
  orLoginWith: {
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(4.0),
    fontFamily: 'Poppins-Regular',
  },
  socialMediaLogin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: responsiveWidth(60),
    marginBottom: responsiveHeight(2),
  },
  socialIcon: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  dontHaveAnContainer: {
    marginTop: responsiveHeight(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dontHaveAn: {
    fontSize: responsiveFontSize(4.0),
    fontFamily: 'Poppins-Regular',
  },
  signUp: {
    marginLeft: responsiveWidth(1),
  },
  signUpBtn: {
    color: "#1F75FE",
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4.0),
    fontFamily: 'Poppins-SemiBold',
  },
  errorText: {
    color: 'red',
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(4),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default LoginScreen;
