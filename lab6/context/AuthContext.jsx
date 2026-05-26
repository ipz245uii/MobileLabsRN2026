import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      name: '',
      age: '',
      city: '',
      createdAt: new Date().toISOString(),
    });
    return result;
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const getUserProfile = async () => {
    if (!user) return null;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const updateUserProfile = async (data) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, data, { merge: true });
  };

  const deleteAccount = async (password) => {
    if (!user) return;
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteUser(user);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      register,
      login,
      logout,
      resetPassword,
      getUserProfile,
      updateUserProfile,
      deleteAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}