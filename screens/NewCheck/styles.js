import styled from 'styled-components/native'
import {AppColors} from "../../AppColors";

export const FormWrapper = styled.View`
  display: flex;
  //background-color: ${AppColors.formBackground};
  padding: 10px;
  border-radius: 10px;
`

export const SelectedFriendsWrapper = styled.View`
  display: flex;
  background-color: #cee5ce;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  gap: 5px;
  margin: 5px;
`

export const SelectedFriendsNamesWrapper = styled.View`
  display: flex;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin: 15px 5px 5px 5px;
`


export const SelectedFriendsWrapper2 = styled.Pressable`
  display: flex;
  background-color: ${AppColors.monochromesShade2};
  padding: 10px;
  border-radius: 10px;
  gap: 5px;
  margin: 5px;
`

export const SelectedFriend = styled.Pressable`
  width: auto;
  background-color: ${AppColors.lightGray};
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  margin: 5px;
`

export const CheckWrapper = styled.View`
  display: flex;
  background-color: ${AppColors.monochromesShade2};
  padding: 10px;
  border-radius: 10px;
  gap: 5px;
  margin: 5px;
`

export const TotalWrapper = styled.View`
  display: flex;
  flex: 1;
  padding: 15px 15px 15px 15px;
  background-color: ${AppColors.monochromesLight3};
  margin-bottom: 15px;
  border-radius: 20px;
  justify-content: space-between;
`

export const ScrollViewWrapper = styled.View`
  display: flex;
  flex: 10;
  background-color: #f6f7fb;

  // background-color: ${AppColors.formBackground};
`

export const ControlPanel = styled.View`
  position: absolute;
  bottom: 20px;
  right: 30px;
  border-radius: 200px;
  padding: 3px;
  background-color: ${AppColors.dark2};
`

export const ControlPanel2 = styled.View`
  position: absolute;
  z-index: 1000;
  bottom: 20px;
  left: 30px;
  padding: 5px;
  border-radius: 200px;
  filter: blur(100px);
  padding: 3px;
  background-color: ${AppColors.dark2};
`

export const ControlPanel3 = styled.View`
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 10px;
  border-radius: 200px;
  background-color: aqua;
`
