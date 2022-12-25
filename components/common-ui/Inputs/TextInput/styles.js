import styled from 'styled-components/native'
import {AppColors} from "../../../../AppColors";

export const InputWrapper = styled.View`
  display: flex;
`

export const ErrorWrapper = styled.View`
  display: flex;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: ${AppColors.errorBackground};
`

export const ErrorText = styled.Text`
  display: flex;
  color: ${AppColors.errorColor};
  padding: 5px;
`

export const StyledTextInput = styled.TextInput`
  display: flex;
  background-color: ${AppColors.inputBackground};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: ${props => props.hasError ? 0 : 10}px;
  border-bottom-left-radius: ${props => props.hasError ? 0 : 10}px;
  color: ${AppColors.inputColor};
  padding: 5px;
`
