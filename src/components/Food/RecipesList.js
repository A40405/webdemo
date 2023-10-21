import React, { useState, useEffect } from 'react';
import { OutlineButton, OutlineButtonNew} from '../../Globalstyles';
import Pagination from '@mui/material/Pagination';
import FoodForm from './fuction_support/FoodForm';

import {
  RecipeWrapper, RecipeContainer, RecipeTitle, RecipeTitle2,
  RecipeContentContainer, RecipeTabContainer,
  RecipeBtn, RecipeCardWrapper, RecipeFeature,
  RecipeFeatureContent, RecipeFeatureText,
  RecipeFeatureDetails, RecipeFeatureItem,
  RecipeItemTitle, RecipeItemContent,
  RecipeItemIcon, RecipeItemText, RecipeImg,
} from './RecipesList.style';
import { getAllFood  } from './api/ApiUtils'; 


const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const recipesPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFood();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = Math.min(startIndex + recipesPerPage, recipes.length);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
    <RecipeWrapper>
      <RecipeContainer>
      <RecipeTitle>Các khóa học nấu ăn</RecipeTitle>
        <RecipeContentContainer>
          <RecipeTabContainer>
            <RecipeBtn to='http://chungchinghiepvu.edu.vn/khoa-day-bi-quyet-nau-cac-mon-oc-ngon---tu-van-kinh-doanh.html'>
              <OutlineButton big bigFont bigRadius>Hải sản</OutlineButton>
            </RecipeBtn>
            <RecipeBtn to='https://vilai.vn/hoc-nau-an-chay-o-ha-noi-chuyen-nghiep-va-uy-tin-nhat-nd35732.html'>
              <OutlineButton big bigFont bigRadius>Thức ăn chay</OutlineButton>  
            </RecipeBtn>
            <RecipeBtn to='https://www.dungplus.com/sach-day-che-bien-cac-mon-an-tu-thit-heo.html'>
              <OutlineButton big bigFont bigRadius>Chế biến thịt heo</OutlineButton>
            </RecipeBtn>
          </RecipeTabContainer>

          <RecipeTitle2>Danh sách món có sẵn</RecipeTitle2>
          <RecipeCardWrapper>
            {recipes.slice(startIndex, endIndex).map((recipe) => (
              <RecipeFeature key={recipe.id}>
                <RecipeImg src={recipe.image_url} alt={recipe.name} />
                <RecipeFeatureContent>
                  <RecipeBtn to={`/food-list/${recipe.id}`}>
                    <OutlineButtonNew >{recipe.name.toUpperCase()}</OutlineButtonNew>
                  </RecipeBtn>
                  <RecipeFeatureText>
                    {recipe.steps && recipe.steps.split('\n').map((step, index) => (
                      <React.Fragment key={index}>
                        {step}
                        <br />
                      </React.Fragment>
                    ))}
                  </RecipeFeatureText>
                  <RecipeFeatureDetails>
                    <RecipeFeatureItem>
                      <RecipeItemTitle>Đánh giá</RecipeItemTitle>
                      <RecipeItemContent>
                        <RecipeItemIcon />
                        <RecipeItemText>{recipe.rating}</RecipeItemText>
                      </RecipeItemContent>
                    </RecipeFeatureItem>
                  </RecipeFeatureDetails>
                </RecipeFeatureContent>
              </RecipeFeature>
            ))}
          </RecipeCardWrapper>
          <Pagination
            count={Math.ceil(recipes.length / recipesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </RecipeContentContainer>
      </RecipeContainer>
      
    </RecipeWrapper>
    <FoodForm />
    </>
  );
};

export default RecipesList;