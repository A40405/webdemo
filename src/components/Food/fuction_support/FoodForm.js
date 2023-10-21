import React, { useState, useEffect } from 'react';
import { BackgroundContainer, FormContainer, 
  FormFoodLabel, FormFoodInput, FormFoodTextarea, FormFoodButton, 
  ErrorMessage, RatingFoodLabel, RatingFoodInput, FoodImageInput, SuccessMessage } from './FoodForm.style';
import {createFood} from '../api/ApiUtils';

function FoodForm() {
  const [name, setName] = useState('');
  const [imageFood, setImageFood] = useState(null);
  const [steps, setSteps] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        clearForm();
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [success]);

  const clearForm = () => {
    setName('');
    setImageFood(null);
    setSteps('');
    setRating(0);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageFoodChange = (e) => {
    setImageFood(e.target.files[0]);
  };

  const handleStepsChange = (e) => {
    setSteps(e.target.value);
  };

  const handleRatingChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (newValue >= 0 && newValue <= 5) {
      setRating(newValue);
      setError(''); 
    } else {
      setError('Rating phải nằm trong khoảng từ 0 đến 5.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageFood) {
      setError('Hãy nhập đầy đủ ảnh và tên.');
      return;
    }

    setError('');
    try {
      const formData = {
        name,
        steps,
        rating,
        image_data: imageFood,
      };

      const response = await createFood(formData);
      if (response && response.data) {
        setSuccess(true);
      } else {
        setError('Failed to create food entry.');
      }
    } catch (error) {
      setError('Failed to create food entry.');
    }
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <h1>Tạo món ăn</h1>
        {success && <SuccessMessage>Thêm món ăn thành công</SuccessMessage>}
        <form onSubmit={handleSubmit}>
          <FormFoodLabel>Name:</FormFoodLabel>
          <FormFoodInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <FormFoodLabel>Food Image:</FormFoodLabel>
          <FoodImageInput
            type="file"
            accept=".jpg, .jpeg, .png" 
            onChange={handleImageFoodChange}
          />
          <FormFoodLabel>Steps:</FormFoodLabel>
          <FormFoodTextarea
            placeholder="Steps"
            value={steps}
            onChange={handleStepsChange}
          />
          <RatingFoodLabel>Rating:</RatingFoodLabel>
          <RatingFoodInput
            type="number"
            step="0.1"
            placeholder="Rating"
            value={rating}
            onChange={handleRatingChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <FormFoodButton type="submit">Add Food</FormFoodButton>
        </form>
      </FormContainer>
    </BackgroundContainer>
  );
}

export default FoodForm;
