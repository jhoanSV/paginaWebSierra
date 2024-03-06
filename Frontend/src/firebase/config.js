import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfEKkDq9b4QUXEulq3SoLkLTQIisRv120",
  authDomain: "sivardev-firebase.firebaseapp.com",
  projectId: "sivardev-firebase",
  storageBucket: "sivardev-firebase.appspot.com",
  messagingSenderId: "829453309425",
  appId: "1:829453309425:web:4d2f14bf9128fed4d8e050"
};

const app = initializeApp(firebaseConfig);
//Here we can upload or get the urlDownload
export const storage = getStorage(app)

export async function getStorageUrl(rout){
    const url = await getDownloadURL(ref(storage, rout))    
    return url
}
