// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_APP_KEY!,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID!,
  // appId: process.env.NEXT_PUBLIC_APP_ID!

  apiKey: 'AIzaSyA25Npx_DtbGiFS7EjNXLa250P5S_I798w',
  authDomain: 'react-next-shop-app-a0b9a.firebaseapp.com',
  projectId: 'react-next-shop-app-a0b9a',
  storageBucket: 'react-next-shop-app-a0b9a.appspot.com',
  messagingSenderId: '52109128671',
  appId: '1:52109128671:web:3b8e7c11e9ea0955a94a6a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
