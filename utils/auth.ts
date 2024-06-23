// utils/auth.ts

export const handleLogin = (email: string, password: string): string | null => {
    if (!email || !password) {
      return "Please fill in both fields";
    }
  
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  
    // Here you can send the data to your backend
    // fetch('your-backend-url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Navigate to another screen if needed
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  
    return null;  // Return null if there are no errors
  };

  

  // utils/auth.ts

export const handleSignUp = (email: string, password: string, confirmPassword: string): string | null => {
  if (!email || !password || !confirmPassword) {
    return "Please fill in all fields";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  // Add your sign-up logic here
  console.log("Email:", email);
  console.log("Password:", password);

  // Here you can send the data to your backend
  // fetch('your-backend-url', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email, password }),
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  //   // Navigate to another screen if needed
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });

  return null;  // Return null if there are no errors
};
