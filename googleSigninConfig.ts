// googleSignInConfig.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: "549195152079-27q4qanm3i7c4bvm8akm844iflp37u3p.apps.googleusercontent.com",
    offlineAccess: true,
  });
};

export default configureGoogleSignIn;
