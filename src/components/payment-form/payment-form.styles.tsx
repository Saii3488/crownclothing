import styled from "styled-components";
import Button from "../button/button-components";
export const PaymentFormContainer=styled.div`
  height:300px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  @media screen and (max-width: 800px){
    justify-content:center;
    height:100px;
    align-items:center;
    margin-left:90px;
  }

`
export const FormContainer=styled.form`
  height:100px;
  min-width:500px;
  @media screen and (max-width: 800px){
    min-width:300px;
  }
`
export const PaymentButton=styled(Button)`
  margin-left:0px;
  margin-top:30px;
`