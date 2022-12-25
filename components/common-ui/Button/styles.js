import styled from 'styled-components/native'
import {AppColors} from "../../../AppColors";

export const ButtonWrapper = styled.View`
  display: flex;
  align-items: ${props => props.alignItems || 'flex-end'};
`

export const StyledText = styled.Text`
  font-weight: 500;
  text-align: center;
  color: ${props => props.textColor || AppColors.buttonTitleDefaultColor};
`

export const StyledPressable = styled.Pressable`
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  background-color: ${AppColors.monochromesShade3};
`
