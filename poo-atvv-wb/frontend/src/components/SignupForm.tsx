import React, { useState } from 'react'; // Importando useState
import api from '../services/api';
import NavbarOrange from './NavbarOrange';

interface SignupFormProps {
  consent: boolean;
  setConsent: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupForm: React.FC<SignupFormProps> = ({ consent, setConsent}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [gender, setGender] = useState(''); 
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '') {
      setError('Preencha o nome!');
      return;
    }
    if (email === '') {
      setError('Preencha o e-mail!');
      return;
    }
    if (password === '') {
      setError('Preencha a senha!');
      return;
    }
    if (password !== passwordValidation) {
      setError('As senhas não coincidem!');
      return;
    }
    if (cpf === '') {
      setError('Preencha o CPF!');
      return;
    }
    if (gender === '') {
      setError('Preencha o sexo!');
      return;
    }
    setError('');
    try {
      await api.post('/auth/users', { email, password, name, cpf, gender, consentGiven: consent });
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <NavbarOrange title="Cadastro de Usuário" />
        {/* <h4 className="center-align">Cadastro de Usuário</h4> */}
        <div className="collection borda branca">

          {/* Nome Completo */}
          <div className="input-field col s12">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="name">Nome Completo</label>
          </div>          
          
          {/* Email */}
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          
          {/* Senha */}
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="password">Senha</label>
          </div>

          {/* Confirmação de Senha */}
          <div className="input-field col s12">
            <input
              id="passwordValidation"
              type="password"
              value={passwordValidation}
              onChange={(e) => setPasswordValidation(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="passwordValidation">Confirme a Senha</label>
          </div>

          {/* CPF */}
          <div className="input-field col s12">
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="cpf">CPF</label>
          </div>

          {/* Seleção de Sexo */}
          <div className="input-field col s12">
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="browser-default"
              required
            >
              <option value="" disabled>
                Sexo
              </option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>

          {/* Consentimento */}
          <div className="col s12">
            <label>
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
              />
              <span>Aceito a coleta de dados conforme LGPD</span>
            </label>
          </div>

          {/* Mensagem de erro */}
          {error && <p className="red-text center-align">{error}</p>}
          
          {/* Botão de Submit */}
          <div className="col s12 center-align">
            <button type="submit" className="btn teal" onClick={handleSubmit}>
              Cadastrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupForm;
