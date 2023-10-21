import styled, { keyframes } from 'styled-components';
import ImgBg1 from '../../images_background/background_addCook1.svg'; 
import ImgBg2 from '../../images_background/background_addCook2.svg'; 
import { TiStarOutline } from 'react-icons/ti';

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
  margin-top: 2rem;
  width: 120rem;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 2.5rem;
  margin-top: 1rem;
`;

export const BackgroundContainer = styled.div`
  background-image: url(${ImgBg2});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FormContainer = styled.div`
  background-image: url(${ImgBg1});
  background-size: cover;
  padding: 5rem;
  border-radius: 0.8rem;
  margin: 2rem 2rem;
  margin-left: 2rem;
  box-shadow: 0 0 0.6rem #bbb;
  color: #f6dcfa;
`;
// styled-components of Food
export const FoodTitle = styled.h2`
font-size: 4rem;
text-align: center;
font-weight: bold;
`;
export const FoodFeature = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 120rem;
height: 50rem;
background-color: #333;
box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.18);
border-radius: 40px;
transition: all .4s ease;
margin-right: 3rem;
margin-bottom: 5rem;
cursor: pointer;
color: #fff;
`;
export const FoodImg = styled.img`
  height: 70%;
  width: 50%;
  margin-top: 1rem;
  margin-left: 1rem;
  transition: all 0.5s ease;
  border-radius: 100%; 
`;
export const FoodFeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-height: 400px; 

  @media only screen and (max-width: 500px) {
    padding: 2rem;
    align-items: center;
  }
`;
export const NameFoodTitle = styled.h3`
font-size: 2rem;
margin-left: 2rem; 
text-align: center;
margin-bottom: 3rem;
font-weight: bold;

@media only screen and (max-width:700px){
    margin-bottom: 0;
}
`;
export const FoodFeatureText = styled.p`
  font-size: 1.6rem;
  padding-bottom: 1.3rem;
  overflow: auto;
  margin-left: 2rem; 

  @media only screen and (max-width: 700px) {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 1.3rem;
  }
`;
export const FoodFeatureDetails = styled.div`
display: flex;
align-items: center;
`;
export const FoodFeatureItem = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
margin-right: 2.5rem;
`;
export const FoodItemTitle = styled.h4`
font-size: 1.6rem;
margin-left: 2rem; 
@media only screen and (max-width:400px){
    font-size: 1.3rem;
}
`;
export const FoodItemContent = styled.div`
display: flex;
align-items: center;
margin-left: 2rem; 
`;
export const FoodItemIcon = styled(TiStarOutline)`
 color: #E38B06;
 font-size: 3rem;
 padding-right: 1rem;
`;
export const FoodItemText = styled.p`
font-size: 1.8rem;
margin-top: 0.2em; 
@media only screen and (max-width:700px){
    font-size: 1.6rem;
}
`;

// styled-components of Cook

export const ButtonNewEditCook = styled.button`
  background-color: transparent;
  color: #e84deb;
  border: 0.4rem solid #81b7f0;
  padding: 2rem 4rem;
  border-radius: 1rem;
  font-size: 2rem;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 6rem;
  margin-right: 2rem;

`;

