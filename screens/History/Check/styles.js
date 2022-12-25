import styled from 'styled-components/native'
import { AppColors } from '../../../AppColors'

export const CheckWrapper = styled.View`
  display: flex;
  flex: 1;
  margin-right: 10px;
  margin-top: 10px;
  background-color: ${props => props.selected ? AppColors.monochromesShade22 : AppColors.monochromesShade1};
  margin-bottom: 10px;
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
  align-items: center;
  gap: 10px;
`

export const LogicWrapper = styled.View`
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

export const LogicWrapper2 = styled.View`
    display: flex;
    padding: 5px;
    margin-right: 10px;
    flex-direction: row;
    margin-bottom: 5px;
    border-radius: 20px;
    justify-content: center;
`


export const StyleWrapper = styled.View`
    display: flex;
    padding: 5px 10px;
    margin-right: 10px;
    flex-direction: row;
    background-color: ${AppColors.monochromesShade3};
    margin-bottom: 5px;
    border-radius: 20px;
    justify-content: center;
`

export const ToolItemWrapper = styled.View`
    background-color: ${props => props.color ? props.color : AppColors.monochromesShade2};
    margin: 5px 10px;
    padding: 10px;
    border-radius: 10px;
`



export const DebtorsWrapper = styled.View`
  display: flex;
  flex: 1;
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
`

export const Debtor = styled.View`
  display: flex;
  
`

export const ControlPanel = styled.View`
  position: absolute;
  bottom: 20px;
  right: 30px;
  border-radius: 200px;
  padding: 3px;
  background-color: ${AppColors.dark2};
`
