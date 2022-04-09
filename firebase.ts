// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBsV92H6dBr4lslnhqTlgn0ZZtmayKf1kE',
  authDomain: 'internship-support-student.firebaseapp.com',
  projectId: 'internship-support-student',
  storageBucket: 'internship-support-student.appspot.com',
  messagingSenderId: '296626903275',
  appId: '1:296626903275:web:58cf2ea30c4a9e2a4f06ae',
  measurementId: 'G-6B07V3TRWT',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
