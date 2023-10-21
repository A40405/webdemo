import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  BackgroundContainer, FormContainer,
  ErrorMessage, SuccessMessage,
  FoodTitle, FoodFeature, FoodImg,
  FoodFeatureContent, NameFoodTitle, FoodFeatureText,
  FoodFeatureDetails, FoodFeatureItem, FoodItemTitle,
  FoodItemContent, FoodItemIcon, FoodItemText,
  ButtonNewEditCook,
} from './CookingRecordForm.style';
import { getFood, updateFood } from './api/ApiUtils';
import ShowCookForm from './fuction_support/ShowCookForm.js';
import CookForm from './fuction_support/CookForm.js'

function CookingRecord() {
  const { FoodId } = useParams();
  const [food, setFood] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isEditingFood, setIsEditingFood] = useState(false);

  const [editNameFood, setEditNameFood] = useState('');
  const [editImageFood, setEditImageFood] = useState(null); 
  const [editStepsFood, setEditStepsFood] = useState('');
  const [editRatingFood, setEditRatingFood] = useState('');

  useEffect(() => {
    getFoodInfo(FoodId);
  }, [FoodId]);

  const getFoodInfo = async (Id) => {
    try {
      const response = await getFood(Id);
      if (response) {
        setFood(response);
        // Initialize the edit state variables
        setEditNameFood(response.name);
        setEditStepsFood(response.steps);
        setEditRatingFood(response.rating);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEditFood = async () => {
    try {
      const updatedFood = {
        name: editNameFood,
        steps: editStepsFood,
        rating: editRatingFood,
      };

      if (editImageFood) {
        updatedFood.image_data = editImageFood;
      }

      const response = await updateFood(FoodId, updatedFood);
      if (response && response.data) {
        setSuccess(true);
        setIsEditingFood(false);
        getFoodInfo(FoodId);
        setTimeout(() => {
          setSuccess(false);
          setEditImageFood(null)
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      setError('Cập nhật món ăn lỗi');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditImageFood(file);
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <FoodTitle>Món ăn</FoodTitle>
        {success && <SuccessMessage>Cập nhật món ăn thành công</SuccessMessage>}
        <FoodFeature key={food.id}>
          <FoodImg src={food.image_url} alt={food.name} />
          <FoodFeatureContent>
              {isEditingFood ? (
                <React.Fragment>
                  <NameFoodTitle>
                    <input
                      type="text"
                      value={editNameFood}
                      onChange={(e) => setEditNameFood(e.target.value)}
                      style={{marginLeft:'-0.6rem', width: '24rem', height: '5rem' }}
                    />
                  </NameFoodTitle>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                      marginBottom: '2.6rem',
                      marginLeft: '2rem',
                      width: '24rem',
                      height: '3rem',
                      border: '1px solid #ccc',
                      fontSize: '1.5rem',
                      borderRadius: '5px', 
                    }}
                  />
                  <FoodFeatureText>
                    <textarea
                      value={editStepsFood}
                      onChange={(e) => setEditStepsFood(e.target.value)}
                      style={{ width: '24rem', height: '6rem' }}
                    />
                  </FoodFeatureText>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NameFoodTitle>{food.name && food.name.toUpperCase()}</NameFoodTitle>
                  <FoodFeatureText>
                    {food.steps && food.steps.split('\n').map((step, index) => (
                      <React.Fragment key={index}>
                        {step}
                        <br />
                      </React.Fragment>
                    ))}
                  </FoodFeatureText>
                </React.Fragment>
              )}
              <FoodFeatureDetails>
              <FoodFeatureItem>
                  <FoodItemTitle>Đánh giá</FoodItemTitle>
                  <FoodItemContent>
                    <FoodItemIcon />
                    {isEditingFood ? (
                      <input
                        type="number"
                        value={editRatingFood}
                        onChange={(e) => setEditRatingFood(e.target.value)}
                        style={{ width: '5rem', height: '3rem' }}
                      />
                    ) : (
                      <FoodItemText>{food.rating}</FoodItemText>
                    )}
                  </FoodItemContent>
              </FoodFeatureItem>
              </FoodFeatureDetails>
          </FoodFeatureContent>
          {isEditingFood ? (
            <React.Fragment>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <ButtonNewEditCook onClick={handleEditFood}>
                Lưu
              </ButtonNewEditCook>
              <ButtonNewEditCook onClick={() => setIsEditingFood(false)}>
                Hủy
              </ButtonNewEditCook>
            </React.Fragment>
          ) : (
            <ButtonNewEditCook onClick={() => setIsEditingFood(true)}>
              Sửa món ăn
            </ButtonNewEditCook>
          )}
        </FoodFeature>
        
        <ShowCookForm FoodId={FoodId}/> {/* Show và edit các lần nấu */}
        <CookForm FoodId={FoodId}/>
      </FormContainer>
    </BackgroundContainer>
  );
}

export default CookingRecord;
