import {Svg, Path} from 'react-native-svg'
import * as S from './styles'

const width = 30
const height = 30

export const IconsType = {
  PROFILE: 'profile',
  FRIENDS: 'friends',
  NEW_CHECK: 'newCheck',
}

const Icons = {
  profile: () => <Svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width={width} height={height}>
    <Path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/>
    <Path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
  </Svg>,

  friends: () => <Svg id="Layer_1" height={height} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
    <Path d="m7.5 13a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0 -2.5-2.5zm7.5 17v-.5a7.5 7.5 0 0 0 -15 0v.5a1 1 0 0 0 2 0v-.5a5.5 5.5 0 0 1 11 0v.5a1 1 0 0 0 2 0zm9-5a7 7 0 0 0 -11.667-5.217 1 1 0 1 0 1.334 1.49 5 5 0 0 1 8.333 3.727 1 1 0 0 0 2 0zm-6.5-9a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0 -2.5-2.5z"/>
  </Svg>,

  newCheck: () => <Svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" height={height} viewBox="0 0 24 24" width={width} data-name="Layer 1">
    <Path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/>
  </Svg>
}

const InteractiveIcon = ({ icon, onPress }) => {
  return (
    <S.StyledTouchableOpacity onPress={onPress}>
      {Icons[icon]()}
    </S.StyledTouchableOpacity>
  )
}

export default InteractiveIcon
