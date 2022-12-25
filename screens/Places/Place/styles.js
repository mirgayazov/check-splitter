import styled from 'styled-components/native'
import { AppColors } from '../../../AppColors'

export const PlaceWrapper = styled.View`
  display: flex;
  flex: 1;
  padding: 15px;
  margin-right: 10px;
  flex-direction: row;
  background-color: ${props => props.selected ? AppColors.monochromesShade22 : AppColors.monochromesShade1};
  margin-bottom: 5px;
  border-radius: 20px;
  justify-content: space-between;
`

export const Info = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const Edit = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
