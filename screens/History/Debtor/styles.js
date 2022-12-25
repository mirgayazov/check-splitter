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

export const Debtor = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.paidOff ? AppColors.monochromesShade1: '#ff9966'};
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`
