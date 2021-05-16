import React from "react";
import logo from "../images/header_logo_theme_dark.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header(props) {

    const [isOpen, setIsOpen] = React.useState(false);

    function handleLogOut() {
        props.handleLogOut();
        setIsOpen(false);
    }

    function handlerClick(e) {
            e.target.classList.toggle('button__close');
            e.target.classList.toggle('button__burger-menu');
            setIsOpen(!isOpen);
    }

    const headerUser = (
        <div className={isOpen ? 'header__wrapper' : 'header__wrapper header__wrapper_hidden'}>
            <span className="header__title">{props.email}</span>
            <Link className="link header__wrapper-link"
                  onClick={handleLogOut}
                  to="/sign-in"
            >Выйти</Link>
        </div>
    )

    return(
            <div className="header">
                <img className="header__logo" src={logo} alt="МЕСТО" />

                <Switch>
                    <Route exact path="/">
                        {headerUser}
                        <div className="header__nav">
                            <button className="button button__burger-menu"
                                    onClick={handlerClick}/>
                        </div>
                    </Route>

                    <Route exact path="/sign-in">
                            <Link to='/sign-up'
                                  className="link header__link"
                            >Регистрация</Link>
                    </Route>

                    <Route exact path="/sign-up">
                            <Link to='/sign-in'
                                  className="link header__link"
                            >Войти</Link>
                    </Route>


                </Switch>
            </div>
    )
}

export default Header;