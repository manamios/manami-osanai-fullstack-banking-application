import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  updateDoc,
  collection,
  where,
  addDoc,
  getDoc,
  doc,
  increment
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDyVEovu-RWQQV86pwsWZqkt3cKNedrxVo",
    authDomain: "manamiosanai-mit.firebaseapp.com",
    databaseURL: "https://manamiosanai-mit-default-rtdb.firebaseio.com",
    projectId: "manamiosanai-mit",
    storageBucket: "manamiosanai-mit.appspot.com",
    messagingSenderId: "941592782745",
    appId: "1:941592782745:web:141029a4270b59fd24d508"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    console.log(q)
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        balance: 0
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password, e) => {
    e.preventDefault()
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user
      console.log(user)
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const getUserDoc = async (user) => {
  console.log(user)
  const q = await query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  const userDoc = await docs.docs[0]
  return userDoc
}

const getUserData = async (user) => {
  const userData = await getUserDoc(user)
  console.log(userData.data())
  return userData.data()
}

const getUserRef = async (user) => {
  const userDoc = await getUserDoc(user)
  const userDocRef = doc(db,"users", userDoc.id)
  console.log(userDocRef)
  return userDocRef
}

const incrementBalance = async (user, amount) => {
  const incrementBy = increment(amount)
  const userRef = await getUserRef(user)
  const updatedDoc = await updateDoc(userRef, {
    "balance": incrementBy
    })
  console.log(await getUserData(user))
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        balance: 0
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getUserRef,
    incrementBalance,
    getUserData
};