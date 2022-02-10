import React from 'react';
import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null);

  {/* открыть попап редактирования bio */}
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  {/* открыть попап добавления карточки */}
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  } 

  {/* открыть попап редактирования аватара */}
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  {/* открыть картинку */}
  function handleCardClick(props) {
    setSelectedCard(props);
  }
  
  {/* закрытие всех попапов */}
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  
  return (
    <div className="page">
      <div className="page__container">
     
      {/* блок: шапка */}
      <Header />
      {/* блок: основноя часть сайта */}
      <Main          
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      {/* блок: подвал */}
      <Footer />
      
      {/* попапы */}
      {/* блок: форма редактирования bio */}
      <PopupWithForm 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name={'bio'}
        title={'Редактировать профиль'}
        children={(
          <>
            <label className="popup__form-field">
              <input type="text" className="popup__text name-input" id="name-input" placeholder="Имя" defaultValue="Жак-Ив Кусто" name="name" minLength="2" maxLength="40" required />
              <span className="popup__text-error name-input-error" ></span>
            </label>
            <label className="popup__form-field">
              <input type="text" className="popup__text about-input" id="about-input"  placeholder="Профессиональная деятельность" defaultValue="Исследователь океана" name="job" minLength="2" maxLength="200" required />
              <span className="popup__text-error about-input-error"></span>
            </label>
          </>
        )}
      />

      {/* блок: форма добавления карточки */}
      <PopupWithForm 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name={'photo'}
        title={'Новое место'}
        children={(
          <>
            <label className="popup__form-field">
              <input type="text" className="popup__text" id="place-input" placeholder="Название" name="place" minLength="2" maxLength="30" required />
              <span className="popup__text-error place-input-error" ></span>
            </label>
            <label className="popup__form-field">
              <input type="url" className="popup__text" id="link-input" placeholder="Ссылка на картинку" name="photo" required />
              <span className="popup__text-error link-input-error"></span>
            </label>
          </>
        )}
      />

      {/* блок: форма редактирования аватара */}
      <PopupWithForm 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={'update'}
        title={'Обновить аватар'}
        children={(
          <>
            <label className="popup__form-field">
              <input type="url" className="popup__text" id="link-input" placeholder="Ссылка на картинку" name="photo" required />
              <span className="popup__text-error link-input-error"></span>
            </label>
          </>
        )}
      />

      {/* блок: открытая картинка */}
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />
      </div>
    </div>
  );
}

export default App;
