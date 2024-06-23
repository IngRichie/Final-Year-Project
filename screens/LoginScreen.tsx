import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions, Image } from 'react-native';
import { TextInput as RNPTextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleLogin } from '../utils/auth';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onLoginPress = () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const errorMsg = handleLogin(email, password);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError(null);
      navigation.navigate('DrawerRoot');
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
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#717171"
              outlineColor="#14779b"
              activeOutlineColor="#085ea9"
              keyboardType="email-address"
              theme={{
                fonts: { regular: { fontWeight: '300' } },
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
              outlineColor="#156190"
              activeOutlineColor="#133e85"
              theme={{
                fonts: { regular: { fontFamily: 'Inter', fontWeight: '300' } },
                colors: { text: '#878787' },
              }}
            />
            <LinearGradient
              colors={['#066fd1', '#0050a0']}
              style={styles.loginButton}
            >
              <Pressable style={styles.pressable} onPress={onLoginPress}>
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
            </LinearGradient>
          </View>
          <Text style={styles.orLoginWith}>Or Login with</Text>
          <View style={styles.socialMediaLogin}>
            <Pressable onPress={onGoogleLoginPress}>
              <Image
                style={styles.socialIcon}
                resizeMode="contain"
                source={require('../assets/google.png')}
              />
            </Pressable>
            <Pressable onPress={onFacebookLoginPress}>
              <Image
                style={styles.socialIcon}
                resizeMode="contain"
                source={require('../assets/image-2.png')}
              />
            </Pressable>
            <Pressable onPress={onXLoginPress}>
              <Image
                style={styles.socialIcon}
                resizeMode="contain"
                source={require('../assets/x.png')}
              />
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
  },
  orLoginWith: {
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(4.0),
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
  },
  signUp: {
    marginLeft: responsiveWidth(1),
  },
  signUpBtn: {
    color: "#004d9a",
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4.0),
  },
  errorText: {
    color: 'red',
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(3),
  },
});

export default LoginScreen;
