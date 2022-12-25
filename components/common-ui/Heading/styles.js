import styled from 'styled-components/native'
import {AppColors} from "../../../AppColors";

export const HeadingWrapper = styled.View`
  display: flex;
  align-items: ${props => props.alignItems || 'flex-start'};
`

export const StyledText = styled.Text`
  font-weight: 600;
  font-size: 20px;
  color: ${props => props.textColor || AppColors.headingColor};
`
