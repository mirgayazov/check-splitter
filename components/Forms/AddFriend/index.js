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

export const AddFriendForm = ({ cb }) => {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(friend) => AppDM.addFriend({ friend, cb })}
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
          <Heading title={'Добавить друга'} wrapperStyle={{ paddingBottom: 10 }}/>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder={'Введите имя...'}
            errors={errors.name}
            touched={touched.name}
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
