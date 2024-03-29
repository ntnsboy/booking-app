/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../App/Context';
import useForm from '../shared/hooks/form';
import useApi from '../shared/hooks/api';

import Input from '../shared/components/Input';
import Button from '../shared/components/Button';

export default function Profile() {
  const { pathname } = useLocation();  // nullable
  const { user, setUserData } = useAppContext();
  const [updateResult, updateRequest] = useApi.patch(pathname);
  //console.log('> location ', pathname); // /path/id

  const onSubmit = async (formValues: any) => {
    const { data } = await updateRequest(formValues);
    setUserData(data);
  }
  const formHandle = useForm(onSubmit);
  const { handleChange, handleSubmit, errors } = formHandle;

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <FormContainer>
          <h4 style={{ textAlign: 'center' }}>
            Edit your profile
          </h4>
          <form onSubmit={handleSubmit} noValidate>
            <Input
              name='name'
              placeholder={user?.name}
              handleChange={handleChange}
              error={errors.userName}
            />
            <Input
              name='phoneNumber'
              placeholder='Phone number'
              handleChange={handleChange}
              error={errors.phoneNumber}
            />
            <SubmitButton type='submit'>
              Save
            </SubmitButton>
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
  margin: 1rem 0;
  width: 100%;
`