import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date() })
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getUserByUsername = async (username) => {
    try {
      return await get(ref(db, `users/${username}`));
    } catch (error) {
      console.error("Error getting user data by username: " + error);
    }
  };

export const createUser = async (
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    uid,
  ) => {
    try {
      return await set(ref(db, `users/${username}`), {
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        uid,
      });
    } catch (error) {
      console.error("Error creating user: " + error);
    }
};