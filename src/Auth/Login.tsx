import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import useForm from '../shared/hooks/form';
import validateLogin from './utils/validateLogin';

import Input from '../shared/components/Input';
import Button from '../shared/components/Button';

export default function Login() {
  const { state } = useLocation();  // nullable
  const auth = useAuthContext();

  const onSubmit = (formValues: any) => {
    auth.login(formValues, state);   // state = pathname from
    //console.log('> form ', formValues);
    //console.log('> location state ', state);
  }
  const formHandle = useForm(onSubmit, validateLogin);
  const { handleChange, handleSubmit, errors } = formHandle;

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <FormContainer>
          <h4 style={{ textAlign: 'center' }}>
            Log in your account
          </h4>
          <form onSubmit={handleSubmit} noValidate>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              handleChange={handleChange}
              error={errors.email}
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              handleChange={handleChange}
              error={errors.password}
            />
            <SubmitButton type='submit'>
              Log in
            </SubmitButton>
            <HelperText>
              <Link to='/register'>Don't have an account? Register here</Link>
            </HelperText>
          </form>
        </FormContainer>
      </div>
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const FormContainer = styled.section`
  max-width: 360px;
  margin: 0 auto 2rem;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 1rem 2rem;
  @media (max-width: 600px) {
    border: none;
  }
`
const SubmitButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`
const HelperText = styled.div`
  padding: 1rem 0;
  font-size: 0.8rem;
  text-align: center;
  color: #5e6c84;
`