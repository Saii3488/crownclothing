import {takeLatest,call,all,put} from 'typed-redux-saga/macro'
import { User,AuthError,AuthErrorCodes } from 'firebase/auth'
import { USER_ACTION_TYPES } from './user.types'
import { signInSuccess,signInFailed,signUpSuccess,signUpFailed,signOutSuccess,signOutFailed,EmailSignInStart,SignUpStart,SignUpSuccess } from './user.action'
import { getCurrentUser,createUserDocumentFromAuth,signInWithGooglePopup,signInAuthUserWithEmailAndPassword,createAuthUserWithEmailAndPassword,signOutUser,AdditionalInformation} from '../../utils/firebase/firebase.utils'
import { useActionData } from 'react-router-dom'
export function* getSnapShotFromUserAuth(userAuth:User,additionalDetails?:AdditionalInformation){
    try{
      const userSnapShot=yield* call(createUserDocumentFromAuth,userAuth,additionalDetails)
      if(userSnapShot){
        yield* put(signInSuccess({id:userSnapShot.id,...userSnapShot.data()}))
      }
    }catch(error){
      yield* put(signInFailed(error as Error))
    }
}
export function* signInWithGoogle(){
    try{
      const {user}=yield* call(signInWithGooglePopup)
      yield* call(getSnapShotFromUserAuth,user)
    }catch(error){
      yield* put(signInFailed(error as Error))
    }
}
export function* signInWithEmail({payload:{email,password}}:EmailSignInStart){
    try{
      const userCredential=yield* call(signInAuthUserWithEmailAndPassword,email,password)
      if(userCredential){
        const{user}=userCredential
        yield* call(getSnapShotFromUserAuth,user)
      }  
    }catch(error){
      yield* put(signInFailed(error as Error))
      if((error as AuthError).code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS){
        alert('wrong password')
    }
      
    }
}
export function* isUserAuthenticated(){
    try{
      const userAuth=yield* call(getCurrentUser)
      if(!userAuth) return;
      yield* call(getSnapShotFromUserAuth,userAuth)
    }catch(error){
      yield* put(signInFailed(error as Error))
    }
}
export function* signUp({payload:{email,password,displayName}}:SignUpStart){
  try{
    const userCredential=yield* call(createAuthUserWithEmailAndPassword,email,password)
      if(userCredential){
        const{user}=userCredential
        yield* put(signUpSuccess(user,{displayName}))
      }  
  }catch(error){
    yield* put(signUpFailed(error as Error))
    if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){
      alert('cannnot create user,email already in use')
  }
    
  }
}
export function* signOut(){
  try{
    yield* call(signOutUser)
    yield* put(signOutSuccess())
  }catch(error){
    yield* put(signOutFailed(error as Error))
  }
}
export function* signInAfterSignUp({payload:{user,additionalDetails}}:SignUpSuccess){
  yield* call(getSnapShotFromUserAuth,user,additionalDetails)
}
export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGoogle)
}
export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}
export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmail)
}
export function* onSignUpStart(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START,signUp)
}
export function* onSignUpSuccess(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,signInAfterSignUp)
}
export function* onSignOutStart(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}
export function* userSagas(){
    yield* all([call(onCheckUserSession),call(onGoogleSignInStart),call(onEmailSignInStart),call(onSignUpStart),call(onSignUpSuccess),call(onSignOutStart)])
}
