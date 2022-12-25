import styled from 'styled-components/native'
import { AppColors } from '../../AppColors'

export const PlacesWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
  background-color: #f6f7fb;
`

export const PlacesListWrapper = styled.View`
  display: flex;
  flex: 10;
`

export const ControlPanel = styled.View`
  position: absolute;
  bottom: 20px;
  right: 30px;
  border-radius: 200px;
  padding: 3px;
  background-color: ${AppColors.dark2};
`

export const SearchWrapper = styled.View`
  display: flex;
  flex: 10;
  border-radius: 20px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
`
