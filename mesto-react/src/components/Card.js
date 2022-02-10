function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card)
  }  
  
  return (
    <li className="element">
    <button type="button" className="element__trash" ></button>
    <img className="element__photo" src={props.link} alt={props.name} onClick={handleCardClick} />
    <div className="element__description">
        <p className="element__text">{props.name}</p>
        <div className="element__likes">
        <button type="button" className="element__heart" aria-label="like"></button>
        <p className="element__likes-amount">{props.likes.length}</p> 
        </div> 
    </div>
    </li>
  )
}


export default Card;