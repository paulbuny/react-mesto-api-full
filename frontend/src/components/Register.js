import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Register (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      document.title = 'Mesto - Register';
    }, []);

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.handleSignUp(email, password);
    }

    return(
        <section className="auth">
            <h3 className="auth__title">Регистрация</h3>
            <form className="auth__form"
                  onSubmit={handleSubmit}>
                <div className="auth__wrapper">
                    <input className="auth__input"
                           name="email" type="email"
                           placeholder="Email"
                           onChange={handleChangeEmail}
                           required/>
                    <input className="auth__input"
                           name="password"
                           type="password"
                           placeholder="Пароль"
                           onChange={handleChangePassword}
                           required/>
                </div>
                <div>
                    <input className="button button__white_theme" type="submit" value="Зарегистрироваться"/>
                    <span className="auth__caption">
                        Уже зарегистрированы?&nbsp;<Link className="link" to={'/sign-in'}>Войти</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Register;
