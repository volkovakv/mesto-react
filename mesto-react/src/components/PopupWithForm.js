function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened': " "}`}>
      <div className="popup__container">
        <form className="popup__form" name={props.name}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__save-button" type="submit" title="Сохранить">Сохранить</button>
        </form>
        <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;