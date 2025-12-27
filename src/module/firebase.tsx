import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export let db: any = null;

export const setCred = (setpath: Function) => {
  const data: any = JSON.parse(sessionStorage.getItem("cred") || "");
  const firebaseConfig = {
    apiKey: data.apiKey,
    authDomain: data.authDomain,
    databaseURL: data.databaseURL,
    projectId: data.projectId,
    storageBucket: data.storageBucket,
    messagingSenderId: data.messagingSenderId,
    appId: data.appId,
    measurementId: data.measurementId,
  };
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  sessionStorage.setItem("is_login", "1");
  const path = localStorage.getItem("path") || "home";
  setpath(path);
};
