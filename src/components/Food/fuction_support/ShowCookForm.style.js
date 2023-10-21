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
  padding: 2rem;
  border-radius: 1rem;
  animation: ${shake} 1s ease-in-out;
  text-align: center;
  margin: 0 auto;
  width: 50rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1.5rem;
  margin-top: 1rem;
  text-align: center; 
`;
export const FormEditCookTitle = styled.h4`
font-size: 3rem;
text-align: center;
margin-bottom: 1rem;
margin-top: 9rem;
color: #fff;
`;
export const ButtonCreateEditCook = styled.button`
  background-color: transparent;
  color: #e84deb;
  border: 0.4rem solid #81b7f0;
  padding: 2rem 4rem;
  border-radius: 1rem;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center; 
  align-items: center; 
  margin: 2rem auto; 
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem; 
`;

export const ButtonSubmitEditCook = styled.button`
  background-color: transparent;
  color: #e84deb;
  border: 0.4rem solid #81b7f0;
  padding: 2rem 4rem;
  border-radius: 1rem;
  font-size: 2rem;
  cursor: pointer;
  margin: 0 1rem; /* Khoảng cách giữa các nút */
`;