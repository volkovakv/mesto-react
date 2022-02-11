function Card({card, onCardClick}) {
  function handleCardClick() {
    onCardClick(card)
  }  
  
  return (
    <li className="element">
    <button type="button" className="element__trash" ></button>
    <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
    <div className="element__description">
        <p className="element__text">{card.name}</p>
        <div className="element__likes">
        <button type="button" className="element__heart" aria-label="like"></button>
        <p className="element__likes-amount">{card.likes.length}</p> 
        </div> 
    </div>
    </li>
  )
}


export default Card;