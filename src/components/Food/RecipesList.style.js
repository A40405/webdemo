import styled from 'styled-components';
import {TiStarOutline} from 'react-icons/ti';
import {Link} from 'react-router-dom';
import {Container} from '../../Globalstyles';

export const RecipeWrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 2rem 0;

`;
export const RecipeContainer = styled(Container)`
display: flex;
flex-direction: column;
${Container};
`;
export const RecipeTitle = styled.h2`
font-size: clamp(2rem, 8vw, 5rem);
text-align: center;
margin-bottom: 2rem;
font-weight: bold;
@media only screen and (max-width:700px){
    margin-bottom: 0;
}
`;
export const RecipeTitle2 = styled.h2`
font-size: clamp(2rem, 8vw, 5rem);
text-align: center;
font-weight: bold;
margin-top: 7rem;
@media only screen and (max-width:700px){
    margin-top: 0;
}
`;

export const RecipeContentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const RecipeTabContainer = styled.div`
display: flex;
justify-content:center;
align-items:center;                                                                                                     
@media only screen and (max-width:700px){
    display: none;
}                                                                            
`;

export const RecipeBtn = styled(Link)`
&:not(:last-child){
    margin-right: 3rem;
}
@media only screen and (max-width: 700px){
    display: none;
 }

`;



export const RecipeCardWrapper = styled.div`                                                
display: flex;                                                                                                                                                                                                                                                                                                                                                                                                                                        
justify-content: space-between;
align-items: center;
margin-top: 6rem;
flex-direction: column;

@media only screen and (min-width:1800px) {
    flex-direction: row;
}
`;

export const RecipeFeature = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 1000px;
height: 350px;
background-color: #fff;
box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.18);
border-radius: 40px;
transition: all .4s ease;
margin-bottom: 5rem;
cursor: pointer;

@media only screen and (min-width: 1800px){
    margin-right: 10rem;
    margin-left: 10rem;
    padding: 0;
}

&:hover{
    box-shadow: 0px 10px 80px rgba(0, 0, 0, 0.12);
    transform: scale(1.05);
    background-color: #333;
    color: #fff;
}

@media only screen and (min-width:1000px) {
    flex-direction: row;
}
@media only screen and (max-width:900px){
    margin-bottom: 10rem;
}
@media only screen and (max-width:700px){
    width: 550px;
    margin-bottom: 3rem;
    &:hover{
        transform: scale(1.02);
    }
}
@media only screen and (max-width:600px){
    width: 500px;
}
@media only screen and (max-width:500px){
    width: 380px;
    height: 300px;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);

}
@media only screen and (max-width:400px){
    width: 330px;
}
`;

export const RecipeImg = styled.img`
  height: 70%;
  width: 40%;
  margin-top: 2rem;
  margin-right: 3rem;
  transition: all 0.5s ease;
  border-radius: 70%; 

  &:hover {
    transform: scale(1.14) rotate(360deg);
    border: 10px solid #fff;
  }

  @media only screen and (max-width: 700px) {
    height: 58%;
    border: 10px solid #fff;
  }

  @media only screen and (max-width: 600px) {
    height: 50%;
    border: 10px solid #fff;
  }

  @media only screen and (max-width: 500px) {
    height: 30%;
    border: 10px solid #fff;
  }
`;


export const RecipeFeatureContent = styled.div`
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


export const RecipeFeatureText = styled.p`
  font-size: 1.6rem;
  padding-bottom: 1.3rem;
  overflow: auto; 
  margin-top: 1.3rem; 
  margin-left: 2rem; 
  @media only screen and (max-width: 700px) {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

export const RecipeFeatureDetails = styled.div`
display: flex;
align-items: center;
`;

export const RecipeFeatureItem = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
margin-right: 2.5rem;
`;

export const RecipeItemTitle = styled.h4`
font-size: 1.4rem;
margin-left: 2rem; 
@media only screen and (max-width:400px){
    font-size: 1.3rem;
}

`;

export const RecipeItemContent = styled.div`
display: flex;
align-items: center;
`;

export const RecipeItemIcon = styled(TiStarOutline)`
 color: #E38B06;
 font-size: 3rem;
 padding-right: 1rem;
 margin-left: 2rem; 
`;

export const RecipeItemText = styled.p`
font-size: 1.8rem;
margin-top: 0.2em; 
@media only screen and (max-width:700px){
    font-size: 1.6rem;
}
`;

