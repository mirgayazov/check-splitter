import styled from 'styled-components/native'
import { AppColors } from '../../../AppColors'

export const FriendWrapper = styled.View`
  display: flex;
  padding: 15px;
  margin-right: 10px;
  flex-direction: row;
  background-color: ${AppColors.monochromesShade22};
  margin-bottom: 5px;
  border-radius: 20px;
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
  align-items: center;
  gap: 10px;
`
