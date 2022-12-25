import {Formik} from "formik";
import { Button, TextInput, Heading } from "../../common-ui";
import * as Yup from 'yup';

import * as S from './styles'
import {AppDM} from "../../../AppDataManager";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, '* слишком короткое имя')
    .max(50, '* слишком длинное имя')
    .required('* заполните поле'),
  lastName: Yup.string()
    .min(2, '* слишком короткая фамилия')
    .max(50, '* слишком длинная фамилия')
    .required('* заполните поле'),
});

export const RegistrationForm = ({ cb }) => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '' }}
      onSubmit={(user) => {
        AppDM.createUser({ user, cb })
      }}
      validationSchema={SignupSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
        }) => (
        <S.FormWrapper>
          <Heading title={'Регистрация'} wrapperStyle={{ paddingBottom: 10 }}/>
          <TextInput
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            placeholder={'Введите имя...'}
            errors={errors.firstName}
            touched={touched.firstName}
            wrapperStyle={{ marginBottom: 10 }}
          />
          <TextInput
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            placeholder={'Введите фамилию...'}
            errors={errors.lastName}
            touched={touched.lastName}
            wrapperStyle={{ marginBottom: 10 }}
          />
          <Button
            onPress={handleSubmit}
            title={'Зарегистироваться'}
          />
        </S.FormWrapper>
      )}
    </Formik>
  )
}
