import './authentication.styles.scss'
import SignUpForm from "../../components/sign-up-form/signup-components";
import SignInForm from "../../components/sign-in-form/sign-in-components";
const Authentication=()=>{
    
    return(
     <div className="authentication-container">
        
        <SignInForm />
        <SignUpForm />
        
     </div>
    );
}
export default Authentication
