import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(10px); }
`;
export const SuccessMessage = styled.div`
  background-color: #00f2ff;
  color: #ba5604;
  font-size: 2.5rem;
  border-radius: 1rem;
  animation: ${shake} 1s ease-in-out;
  text-align: center;
  margin-top: 2rem;
  float: right;
  width: 40rem;
`;


export const ErrorMessage = styled.p`
  color: red;
  font-size: 2.5rem;
  margin-top: 1rem;
`;
export const FormCookContainer = styled.div`
  padding: 6rem;
  margin-top: 8rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 0.6rem #bbb;
  float: right; 
  margin-right: 10rem;
  width: 40%;
`;
export const FormCookTitle = styled.h4`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #fff;
`;
export const FormCookLabel = styled.label`
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1.5rempx;
  margin-bottom: 2.5rem;
  font-size: 2rem;
`;

export const CookImageInput = styled.input`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2.5rem;
  border: 0.2rem solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;
export const ButtonNewCook = styled.button`
  background-color: transparent;
  color: #e8a268;
  border: 0.4rem solid #81b7f0;
  padding: 2rem 2rem;
  border-radius: 1rem;
  font-size: 2rem;
  cursor: pointer;
  margin-top: 10rem;
  margin-right: 2rem;
`;
export const ButtonSummitCook = styled.button`
  background-color: transparent;
  color: #e8a268;
  border: 0.4rem solid #81b7f0;
  padding: 2rem 4rem;
  border-radius: 1rem;
  font-size: 2rem;
  cursor: pointer;
  margin-top: 10rem;
  margin-right: 10rem;
  float: right; 
`;


