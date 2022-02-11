import React from 'react';
import api from '../utils/Api';
import Card from './Card';

export function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));      
  }, []);
  
  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__avatar-edit" aria-label="avatar-edit" onClick={onEditAvatar}>
          <img src={`${userAvatar}`} className="profile__avatar" alt="К сожалению, изображение не доступно" onClick={onEditAvatar} />
        </button>  
        <div className="profile__bio">             
          <h1 className="profile__info-name">{userName}</h1>
          <button type="button" className="profile__info-edit-button" onClick={onEditProfile}></button>
          <h2 className="profile__info-job">{userDescription}</h2>
        </div>
        <button type="button" className="profile__add-button" aria-label="add-photo" onClick={onAddPlace}></button>
      </section> 
        
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
              />
            ))}          
        </ul>
    </section> 
    </main>
  );
}

export default Main;




