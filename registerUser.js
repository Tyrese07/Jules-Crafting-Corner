const AWS = require('aws-sdk');
const config = require('config.js');

// Configure AWS SDK
AWS.config.update({ region: config.aws.region });

// Create a new CognitoIdentityServiceProvider object
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// Function to register a new user
async function registerUser(username, password, email) {
  const params = {
    ClientId: config.aws.cognito.userPoolWebClientId,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      // Add additional attributes if needed
    ],
  };

  try {
    const data = await cognitoIdentityServiceProvider.signUp(params).promise();
    console.log('User registered successfully:', data);
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Example usage
const username = 'new_user';
const password = 'P@ssw0rd';
const email = 'new_user@example.com';

registerUser(username, password, email);
