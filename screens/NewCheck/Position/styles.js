import styled from 'styled-components/native'
import { AppColors } from '../../../AppColors'

export const PositionWrapper = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  padding: 15px 15px 0 15px;
  background-color: ${AppColors.monochromesLight3};
  margin-bottom: 15px;
  border-radius: 20px;
  justify-content: space-between;
`

export const Table = styled.View`
  display: flex;
  padding-right: 5px;
  // background-color: ${AppColors.monochromesLight1};
  text-align: right;
  align-items: flex-end;
`

export const Table2 = styled.View`
  display: flex;
  padding-right: 5px;
  // background-color: ${AppColors.monochromesLight1};
  text-align: right;
`

export const Cell = styled.View`
  width: 33%;
  text-align: right;
`

export const PositionInfo = styled.TouchableOpacity`
  display: flex;
  padding: 5px 15px;
  margin-left: 5px;
  width: auto;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${AppColors.monochromesShade1};
`

export const FriendsInfo = styled.View`
  padding: 15px 15px 15px 25px;
  display: flex;
  flex-direction: row;
`

export const Edit = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
