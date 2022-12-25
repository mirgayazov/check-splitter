import styled from 'styled-components/native'
import {AppColors} from "../../../AppColors";

export const FormWrapper = styled.View`
  display: flex;
  background-color: ${AppColors.formBackground};
  padding: 10px;
  border-radius: 10px;
  margin: 15px;
`
export const SelectedFriendsWrapper = styled.View`
  display: flex;
  background-color: #cee5ce;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin: 5px;
`

export const SelectedFriendsWrapper3 = styled.View`
  display: flex;
  background-color: ${AppColors.monochromesShade3};
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  gap: 5px;
  margin: 5px 0px 25px 0px;
`

export const SelectedFriendsWrapper2 = styled.View`
  display: flex;
  background-color: ${AppColors.monochromesShade3};
  padding: 10px;
  border-radius: 10px;
  gap: 5px;
  margin-bottom: 25px;
`

export const SelectedFriend = styled.Pressable`
  display: flex;
  width: auto;
  background-color: ${props => props.selected ? AppColors.monochromesShade1 :  AppColors.monochromesShade22};
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
`

export const SelectedFriend2 = styled.Pressable`
  display: flex;
  width: auto;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${AppColors.monochromesShade1};
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
`
