import { db } from '../services/firebase';
import api from './api';

const UserService = {
  signUp: async (email, password) => {
    const response = await api.post('/signup', { email, password });
    return response.data;
  },

  signIn: async (email, password) => {
    const response = await api.post('/signin', { email, password });
    return response.data;
  },

  getUserProfile: async (uid) => {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.error(`No user found with UID: ${uid}`);
      return null;
    }
  },

  updateUserProfile: async (uid, data) => {
    const userRef = db.collection('users').doc(uid);
    await userRef.update(data);
  },
};

export const createUserDocument = async (uid, data) => {
  const userRef = db.collection('users').doc(uid);
  await userRef.set(data);
};

export default UserService;
