import {Formik} from "formik";
import { Button, TextInput, Heading, Icon } from "../../common-ui";
import * as Yup from 'yup';

import * as S from './styles'
import {AppDM} from "../../../AppDataManager";

const AddPlaceSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '* слишком короткое имя')
    .max(50, '* слишком длинное имя')
    .required('* заполните поле'),
})

export const EditPlaceForm = ({ place, cb }) => {
  return (
    <Formik
      initialValues={{ name: place.name }}
      onSubmit={(editedPlace) => AppDM.editPlace({ editedPlace: {...place, ...editedPlace}, cb })}
      validationSchema={AddPlaceSchema}
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
          <Heading title={'Редактирование места'} wrapperStyle={{ paddingBottom: 10 }}/>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder={'Введите название...'}
            errors={errors.name}
            touched={touched.name}
            wrapperStyle={{ marginBottom: 10 }}
          />
          <Button
            onPress={handleSubmit}
            title={'Сохранить'}
          />
        </S.FormWrapper>
      )}
    </Formik>
  )
}
