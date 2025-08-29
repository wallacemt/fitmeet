import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const baseURL = 'http://10.0.2.2:3000';
const TOKEN_STORAGE_KEY = 'com.fitmeet.token';

export async function getHeaders({auth = false} = {}) {
  const token = await Keychain.getGenericPassword({
    service: TOKEN_STORAGE_KEY,
  });
  return {
    'Content-Type': 'application/json',
    ...(auth && token && {Authorization: `Bearer ${token.password}`}),
  };
}

export async function tokenValidation(token: string) {
  try {
    const response = await axios.get(`${baseURL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      return true;
    }
  } catch (error) {
    return false;
  }
}
