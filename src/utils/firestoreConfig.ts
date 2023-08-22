import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjffIWezyh1UPLYuhuZg8s3qBsnMjcLTY",
  authDomain: "qwangu-2279c.firebaseapp.com",
  projectId: "qwangu-2279c",
  storageBucket: "qwangu-2279c.appspot.com",
  messagingSenderId: "135215027254",
  appId: "1:135215027254:web:1b26ab91475c0db4b53497",
};

const app = initializeApp(firebaseConfig);
export const storageBucket = getStorage(app);
