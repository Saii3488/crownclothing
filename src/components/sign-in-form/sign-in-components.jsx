import { useState } from "react";
import { useDispatch } from "react-redux";

import { googleSignInStart,emailSignInStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input-components";
import './sign-in-styles.scss'
import Button,{BUTTON_TYPE_CLASSES} from "../button/button-components";

import userEvent from "@testing-library/user-event";
const defaultFormFields={
    email:'',
    password:'',
}
const SignInForm=()=>{
    const dispatch=useDispatch()
    const[formFields,setFormFields]=useState(defaultFormFields);
    const{email,password}=formFields;
    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const signInWithGoogle=async()=>{
        dispatch(googleSignInStart())
    }
    
    
    const handleSubmit= async (event)=>{
        event.preventDefault();


        
        
        try{
            dispatch(emailSignInStart(email,password))
            
            
            resetFormFields();

        } catch(error){
          if(error.code == 'auth/invalid-credential'){
            alert('Wrong Password');
          }
          console.log(error);
        };
    };
    
    const handleChange=(event)=>{
     const{name,value}=event.target;
     setFormFields({...formFields,[name]: value});
    }
    return(
      <div className="sign-up-container">
       <h2>Already Have An Account?</h2>
       <span>Sign In With Email And Password</span>
       <form onSubmit={handleSubmit}>     
        
        <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>
        
        <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>

        <div className="buttons-container">
          <Button  type="submit">Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
       </form>
      </div>
    );
}    
export default SignInForm



