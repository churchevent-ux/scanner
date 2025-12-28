import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { showErrorToast } from "./toast";

// export async function addUser(body: any) {
//   try {
//     await addDoc(collection(db, "users"), body);
//   } catch (e) {
//     console.error("Error adding user:", e);
//   }
//   console.log("COmplated!");
// }

const collectionName = "users";

export async function getOneUsers(uniqueId: string): Promise<any> {
  try {
    const q = query(
      collection(db, collectionName),
      where("uniqueId", "==", uniqueId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return docData;
    } else return null;
  } catch (error) {
    return null;
  }
}

export async function updateOneUsers(
  uniqueId: string,
  data: any
): Promise<any> {
  try {
    const q = query(collection(db, "users"), where("uniqueId", "==", uniqueId));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("User not found");
    const docRef = snap.docs[0].ref;
    await updateDoc(docRef, data);
    return { id: snap.docs[0].id, ...data };
  } catch (error) {
    return null;
  }
}

export async function getAllUsers(_page: number): Promise<any> {
  try {
    const coll = collection(db, "users");
    const snapshot = await getCountFromServer(coll);
    const total = snapshot.data().count;

    const q = query(
      collection(db, collectionName),
      // startAfter(20 * page),
      limit(20)
      // orderBy("id", "desc")
      // orderBy("checkUpdatedAt", "desc")
    );
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { total, data };
  } catch (error) {
    console.log(error);
    showErrorToast("Error on loading users");
    return { total: 0, data: [] };
  }
}

export async function getAllUsersSignedIn(_page: number): Promise<any> {
  try {
    const coll = collection(db, collectionName);
    const q1 = query(coll, where("checkInStatus", "==", "Entered"));

    const snapshot = await getCountFromServer(q1);
    const total = snapshot.data().count;

    // const q = query(
    //   collection(db, collectionName),
    //   where("checkInStatus", "==", "Entered"),
    //   // orderBy("checkUpdatedAt", "desc"),
    //   limit(20)
    // );
    // const snap = await getDocs(q);
    // const data = snap.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    const data: any = [];
    return { total, data };
  } catch (error) {
    console.log(error);
    showErrorToast("Error on loading users");
    return { total: 0, data: [] };
  }
}

export async function getAllUsersSignedOut(_page: number): Promise<any> {
  try {
    const coll = collection(db, collectionName);
    const q1 = query(coll, where("checkInStatus", "==", "Exited"));

    const snapshot = await getCountFromServer(q1);
    const total = snapshot.data().count;

    // const q = query(
    //   collection(db, collectionName),
    //   where("checkInStatus", "==", "Exited"),
    //   // orderBy("checkUpdatedAt", "desc"),
    //   limit(20)
    // );
    // const snap = await getDocs(q);
    // const data = snap.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    const data: any = [];
    return { total, data };
  } catch (error) {
    console.log(error);
    showErrorToast("Error on loading users");
    return { total: 0, data: [] };
  }
}

export async function getAllUsersStored(_page: number): Promise<any> {
  try {
    const coll = collection(db, collectionName);
    const q1 = query(coll, where("storeStatus", "==", "Stored"));

    const snapshot = await getCountFromServer(q1);
    const total = snapshot.data().count;

    const data: any = [];
    return { total, data };
  } catch (error) {
    console.log(error);
    showErrorToast("Error on loading users");
    return { total: 0, data: [] };
  }
}

export async function getAllUsersStoredOut(_page: number): Promise<any> {
  try {
    const coll = collection(db, collectionName);
    const q1 = query(coll, where("storeStatus", "==", "Empty"));

    const snapshot = await getCountFromServer(q1);
    const total = snapshot.data().count;

    const data: any = [];
    return { total, data };
  } catch (error) {
    console.log(error);
    showErrorToast("Error on loading users");
    return { total: 0, data: [] };
  }
}

export async function getAllUsersOnBreak(_page: number): Promise<any> {
  try {
    const coll = collection(db, collectionName);
    const q1 = query(coll, where("checkInStatus", "==", "OnBreak"));

    const snapshot = await getCountFromServer(q1);
    const total = snapshot.data().count;

    const data: any = [];
    return { total, data };
  } catch (error) {
    console.log(error);
    showErrorToast("Error on loading users");
    return { total: 0, data: [] };
  }
}
