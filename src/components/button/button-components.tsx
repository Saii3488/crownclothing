import { FC,ButtonHTMLAttributes } from 'react'
import { Basebutton,GoogleSignInButton,InvertedButton,ButtonSpinner } from './button-styled'

export enum BUTTON_TYPE_CLASSES{
  base='base',
  google='google-sign-in',
  inverted='inverted',
};
const getButton=(buttonType=BUTTON_TYPE_CLASSES.base):typeof Basebutton=>({
  [BUTTON_TYPE_CLASSES.base]:Basebutton,
  [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]:InvertedButton,

}[buttonType])
export type ButtonProps={
  buttonType?:BUTTON_TYPE_CLASSES;
  isLoading?:boolean;
}& ButtonHTMLAttributes<HTMLButtonElement>
const Button:FC<ButtonProps>=({children,buttonType,isLoading,...otherProps})=>{
    const CustomButton=getButton(buttonType)
    return(
     <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading? <ButtonSpinner /> : children}
     </CustomButton>
    );

}
export default Button;