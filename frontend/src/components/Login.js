import React, {useState} from 'react';

function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.handleSignIn(email, password);
    }

    return(
        <section className="auth">
            <h3 className="auth__title">Вход</h3>
            <form className="auth__form"
                  onSubmit={handleSubmit}>
                <div className="auth__wrapper">
                    <input
                        className="auth__input"
                        name="email" type="email"
                        placeholder="Email"
                        onChange={handleChangeEmail}
                        required/>
                    <input
                        className="auth__input"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={handleChangePassword}
                        required/>
                </div>
                <div>
                    <input className="button button__white_theme" type="submit" value="Войти"/>
                    <span className="auth__caption" />
                </div>
            </form>
        </section>
    )
}

export default Login;