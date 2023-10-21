import React, { useState, useEffect } from 'react';
import {
  ErrorMessage,
  SuccessMessage,
  FormCookContainer,
  FormCookTitle,
  FormCookLabel,
  CookImageInput,
  FormTextarea,
  ButtonNewCook,
  ButtonSummitCook,
} from './CookForm.style';
import { createCookingRecord } from '../api/ApiUtils';

function CookingRecord({ FoodId }) {
  const [newCookImage, setNewCookImage] = useState(null);
  const [newCookComment, setNewCookComment] = useState('');
  const [newCookTips, setNewCookTips] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isCreatingNewCook, setIsCreatingNewCook] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        setSuccess(false);
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const clearForm = () => {
    setNewCookImage(null);
    setNewCookComment('');
    setNewCookTips('');
    setIsCreatingNewCook(false);
  };

  const handleNewCookImageChange = (e) => {
    setNewCookImage(e.target.files[0]);
  };

  const handleNewCookCommentChange = (e) => {
    setNewCookComment(e.target.value);
  };

  const handleNewCookTipsChange = (e) => {
    setNewCookTips(e.target.value);
  };

  const handleCreateNewCook = () => {
    setIsCreatingNewCook(true);
  };

  const handleCancelCreateNewCook = () => {
    clearForm();
  };

  const handleSaveNewCook = async (e) => {
    e.preventDefault(); 

    if (!newCookImage) {
      setError('Vui lòng nhập ảnh lần nấu mới');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    try {
      const formData = {
        food_id: FoodId,
        image_data: newCookImage,
        comment: newCookComment,
        tips: newCookTips,
      };

      const response = await createCookingRecord(formData);
      if (response) {
        setSuccess(true);
        clearForm();
      }
    } catch (errorResponse) {
      setError('Tạo lần nấu mới lỗi');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  
  return (
    <div>
      {success && <SuccessMessage>Lưu thành công</SuccessMessage>}
      {isCreatingNewCook ? (
        <form onSubmit={handleSaveNewCook}>
          <FormCookContainer>
            
          {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormCookTitle>Tạo lần nấu mới</FormCookTitle>
            <FormCookLabel>Image:</FormCookLabel>
            <CookImageInput
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleNewCookImageChange}
            />
            <FormCookLabel>Comment:</FormCookLabel>
            <FormTextarea
              placeholder="Comment"
              value={newCookComment}
              onChange={handleNewCookCommentChange}
            />
            <FormCookLabel>Tips:</FormCookLabel>
            <FormTextarea
              placeholder="Tips"
              value={newCookTips}
              onChange={handleNewCookTipsChange}
            />
            <ButtonNewCook type="submit">Lưu lần nấu mới</ButtonNewCook>
            <ButtonNewCook type="button" onClick={handleCancelCreateNewCook}>
              Hủy
            </ButtonNewCook>
          </FormCookContainer>
        </form>
      ) : (
        <ButtonSummitCook onClick={handleCreateNewCook}>Tạo lần nấu mới</ButtonSummitCook>
      )}
    </div>
  );
}

export default CookingRecord;
