import styled, { keyframes } from 'styled-components';
import ImgBg1 from '../../../images_background/background_addDishes1.svg'; 
import ImgBg2 from '../../../images_background/background_addDishes2.svg'; 
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-5px); }
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
  margin-top: 2rem;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 2rem;
  margin-top: 1rem;
`;
export const BackgroundContainer = styled.div`
  background-image: url(${ImgBg2});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width:50%;
  margin: 0 auto; 
  margin-bottom: 2rem;
`;

export const FormContainer = styled.div`
  background-image: url(${ImgBg1});
  background-size: cover;
  padding: 5rem;
  border-radius: 0.8rem;
  margin-bottom: 4rem;
  margin-top: 4rem;
  box-shadow: 0 0 0.6rem #bbb;
  color: #f6dcfa;
`;

export const FormFoodLabel = styled.label`
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const FormFoodInput = styled.input`
  width: 100%;
  padding: 2rem;
  margin-bottom: 4rem;
  border: 1px solid #ccc;
  border-radius: 0.7rem;
  font-size: 1.5rem;
`;

export const FormFoodTextarea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  margin-bottom: 4rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  font-size: 1.5rem;
`;

export const FormFoodButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 1.4rem 3rem;
  border: none;
  border-radius: 0.7rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const RatingFoodInput = styled.input`
  width: 10rem;
  height: 4.5rem;
  padding: 2rem;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.7rem;
  font-size: 2rem;
`;

export const RatingFoodLabel = styled.label`
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
`;

export const FoodImageInput = styled.input`
  width: 100%;
  padding: 2rem;
  margin-bottom: 4rem;
  border: 1px solid #ccc;
  border-radius: 0.7rem;
  font-size: 1.5rem;
`;
