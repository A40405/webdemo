import React, { useState, useEffect } from 'react';
import {
  ErrorMessage,
  SuccessMessage,
  FormEditCookTitle,
  ButtonCreateEditCook,
  ButtonSubmitEditCook,
  ButtonContainer,
} from './ShowCookForm.style';
import { getCookingRecords, updateCookingRecord } from '../api/ApiUtils';

function ShowCookForm({ FoodId }) {
  const [cookingRecordsWithEditing, setCookingRecordsWithEditing] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getCookInfo(FoodId);
  }, [FoodId]);

  const getCookInfo = async (Id) => {
    try {
      const recordsResponse = await getCookingRecords(Id);
      if (recordsResponse) {
        const recordsWithEditing = recordsResponse.map(cook => ({ ...cook, isEditing: false }));
        setCookingRecordsWithEditing(recordsWithEditing);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCookingRecord = (recordId) => {
    const updatedRecords = cookingRecordsWithEditing.map(cook => {
      if (cook.id === recordId) {
        return { ...cook, isEditing: true };
      }
      return cook;
    });
    setCookingRecordsWithEditing(updatedRecords);
  };

  const handleCancelEdit = (recordId) => {
    const updatedRecords = cookingRecordsWithEditing.map(cook => {
      if (cook.id === recordId) {
        return { ...cook, isEditing: false };
      }
      return cook;
    });
    setCookingRecordsWithEditing(updatedRecords);
  };

  const handleUpdateCookTips = (e, recordId) => {
    const updatedRecords = cookingRecordsWithEditing.map(cook => {
      if (cook.id === recordId) {
        return { ...cook, tips: e.target.value };
      }
      return cook;
    });
    setCookingRecordsWithEditing(updatedRecords);
  };

  const handleSaveCookingRecord = async (recordId) => {
    const updatedCook = { tips: cookingRecordsWithEditing.find(cook => cook.id === recordId).tips };

    try {
      const response = await updateCookingRecord(recordId, updatedCook);
      if (response) {
        setSuccess('Cập nhật bí quyết nấu thành công');
        setTimeout(() => {
          setSuccess('');
          handleCancelEdit(recordId); 
          getCookInfo(FoodId);
        }, 2000);
      }
    } catch (error) {
      setError('Cập nhật bí quyết nấu lỗi.');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <>
      <FormEditCookTitle>Danh sách các lần nấu</FormEditCookTitle>

      {cookingRecordsWithEditing.map((cook) => (
        <div key={cook.id}>
          <img
            src={cook.image_url}
            alt={`Nấu lần ${cook.id}`}
            style={{
              width: '60%',
              height: '36rem',
              display: 'block',
              margin: '4rem auto',
              borderRadius: '5%',
              overflow: 'hidden',
            }}
          />
          <p style={{ fontSize: '1.5rem', marginLeft: '25rem' }}> Comment: {cook.comment} </p>
          {success && <SuccessMessage>{success}</SuccessMessage>}
          {cook.isEditing ? (
            <input
              type="text"
              value={cook.tips}
              onChange={(e) => handleUpdateCookTips(e, cook.id)}
              style={{
                width: '40rem',
                height: '6rem',
                display: 'block',
                margin: '2rem auto',
                fontSize: '1.5rem',
              }}
            />
          ) : (
            <p style={{ fontSize: '1.5rem', marginLeft: '25rem' }}>Tips: {cook.tips}</p>
          )}
          {cook.isEditing ? (
            <React.Fragment>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <ButtonContainer>
                <ButtonSubmitEditCook onClick={() => handleSaveCookingRecord(cook.id)}>
                  Lưu
                </ButtonSubmitEditCook>
                <ButtonSubmitEditCook onClick={() => handleCancelEdit(cook.id)}>
                  Hủy
                </ButtonSubmitEditCook>
              </ButtonContainer>
            </React.Fragment>
          ) : (
            <ButtonCreateEditCook onClick={() => handleEditCookingRecord(cook.id)}>
              Sửa bí quyết nấu
            </ButtonCreateEditCook>
          )}
        </div>
      ))}
    </>
  );
}

export default ShowCookForm;
