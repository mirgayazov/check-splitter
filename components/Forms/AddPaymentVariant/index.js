import {Formik} from "formik";
import { Button, TextInput, Heading } from "../../common-ui";
import * as Yup from 'yup';

import * as S from './styles'
import {AppDM} from "../../../AppDataManager";

const AddFriendSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '* слишком короткое имя')
    .max(50, '* слишком длинное имя')
    .required('* заполните поле'),
})

export const AddPaymentVariantForm = ({ cb }) => {
  return (
    <Formik
      initialValues={{ name: '', ref: '' }}
      onSubmit={(payment) => {
        console.log(123)
        console.log(payment)
        AppDM.createPaymentVariant({pv: payment, cb})
      }}
      validationSchema={AddFriendSchema}
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
          <Heading title={'Новый способ оплаты'} wrapperStyle={{ paddingBottom: 10 }}/>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder={'Введите название...'}
            errors={errors.name}
            touched={touched.name}
            wrapperStyle={{ marginBottom: 10 }}
          />
          <TextInput
            onChangeText={handleChange('ref')}
            onBlur={handleBlur('ref')}
            value={values.ref}
            placeholder={'Введите референс...'}
            errors={errors.ref}
            touched={touched.ref}
            wrapperStyle={{ marginBottom: 10 }}
          />
          <Button
            onPress={handleSubmit}
            title={'Добавить'}
          />
        </S.FormWrapper>
      )}
    </Formik>
  )
}
