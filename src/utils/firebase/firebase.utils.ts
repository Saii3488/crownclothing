import {initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,User,NextOrObserver} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch, collectionGroup,query,getDocs,QueryDocumentSnapshot } from 'firebase/firestore';
import { Category } from '../../store/category/category.types';
const firebaseConfig = {
    apiKey: "AIzaSyAqUmEK51rCPH897pdipxCI87LhH3hvLJE",
    authDomain: "crownclothing-db-ee9c3.firebaseapp.com",
    projectId: "crownclothing-db-ee9c3",
    storageBucket: "crownclothing-db-ee9c3.appspot.com",
    messagingSenderId: "599287018246",
    appId: "1:599287018246:web:4d49b5dc395d3419e7a487"
  };
  
  
const firebaseApp = initializeApp(firebaseConfig);
const googleprovider=new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt:'select_account',
});

export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,googleprovider);
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,googleprovider);
export const db=getFirestore();
export type ObjectToAdd={
  title:string;
}
export const addCollectionAndDocuments=async<T extends ObjectToAdd>(collectionKey:string,objectsToAdd:T[]):Promise<void>=>{
   const collectionRef=collection(db,collectionKey)
   const batch=writeBatch(db)
   objectsToAdd.forEach((object)=>{
    const docRef=doc(collectionRef,object.title.toLowerCase())
    batch.set(docRef,object)
   })
   await batch.commit();
   console.log('done')
}
export const getCollectionAndDocuments=async():Promise<Category[]>=>{
  const collectionRef=collection(db,'categories')
  const q=query(collectionRef)
  const querySnapShot=await getDocs(q)
  return querySnapShot.docs.map((docSnapshot)=>docSnapshot.data()as Category)  
}
export type AdditionalInformation={
  displayName?:string;
}
export type UserData={
  createdAt:Date;
  displayName:string;
  email:string;
}
export const createUserDocumentFromAuth=async(userAuth:User,additionalInformation={}as AdditionalInformation):Promise<void|QueryDocumentSnapshot<UserData>>=>{
  if(!userAuth) return;
  const userDocRef=doc(db,'users',userAuth.uid);
  console.log(userDocRef);

  const userSnapShot=await getDoc(userDocRef);
  if(!userSnapShot.exists()){
    const{displayName,email}=userAuth;
    const createdAt=new Date();
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    }catch(error){
      console.log('error creating the user',error);
    }

  }
  return userSnapShot as QueryDocumentSnapshot<UserData>
}
export const createAuthUserWithEmailAndPassword=async(email:string,password:string)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password)
}
export const signInAuthUserWithEmailAndPassword=async(email:string,password:string)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password)
}
export const signOutUser=async ()=>await signOut(auth);
export const onAuthStateChangedListener=(callback:NextOrObserver<User>)=>onAuthStateChanged(auth,callback)
export const getCurrentUser=():Promise<User|null>=>{
  return new Promise((resolve,reject)=>{
    const unsubscibe=onAuthStateChanged(
      auth,
      (userAuth)=>{
        unsubscibe()
        resolve(userAuth)

      },
      reject
    )
  })
}