import logo from '../images/header-logo.svg'

function Header() {
  return (
        <header className="header">
          <img src={logo} className="header__logo" alt="К сожалению, изображение не доступно" />
        </header>
  );
}

export default Header;
