import React from 'react';
import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';

function App() {  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }, []) 

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));      
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
      if (!isLiked) {
        api
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        api
          .deleteLike(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          })
          .catch((err) => {
            console.error(err);
          });
      }
  }

  {/* удаление карточки */}
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

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
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  {/* редактирование профиля, отправка данных в API */}
  function handleUpdateUser(inputValues) {
    api
      .editProfile(inputValues)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  {/* редактирование автара */}
  function handleUpdateAvatar(inputValues) {
    api
      .updateProfileAvatar(inputValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  {/* добавление карточки */}
  function handleAddPlaceSubmit(inputValues) {
    api
      .addNewCard(inputValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
      .catch((err) => {
      console.error(err);
    });
  }
  
  {/* закрытие всех попапов */}
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
        {/* блок: шапка */}
        <Header />
        {/* блок: основноя часть сайта */}
        <Main          
          onUpdateAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        {/* блок: подвал */}
        <Footer />
      
        {/* попапы */}
        {/* блок: форма редактирования bio */}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* блок: форма добавления карточки */}
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* блок: форма редактирования аватара */}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* блок: открытая картинка */}
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
