import * as S from './styles'

export const TextInput = ({
  onChangeText,
  onBlur,
  value,
  placeholder,
  errors,
  touched,
  wrapperStyle = {},
}) => {
  const renderError = () => {
    return (
      <S.ErrorWrapper>
        <S.ErrorText>{errors}</S.ErrorText>
      </S.ErrorWrapper>
    )
  }

  return (
    <S.InputWrapper style={wrapperStyle}>
     <S.StyledTextInput
       onChangeText={onChangeText}
       onBlur={onBlur}
       value={value}
       placeholder={placeholder}
       hasError={errors && touched}
     />
     {errors && touched && renderError()}
    </S.InputWrapper>
  )
}
