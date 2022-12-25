import * as S from './styles'
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import Octicons from "react-native-vector-icons/Octicons"
import Feather from "react-native-vector-icons/Feather"

export const Icon = ({
  onPress = () => {},
  iconName,
  color,
  size,
  wrapperStyle = {},
  provider = 'AntDesign'
}) => {
  return (
    <S.IconWrapper style={wrapperStyle}>
      <S.StyledPressable onPress={onPress}>
        {provider === 'AntDesign' && <AntDesign name={iconName} color={color} size={size} />}
        {provider === 'Fontisto' && <Fontisto name={iconName} color={color} size={size} />}
        {provider === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={iconName} color={color} size={size} />}
        {provider === 'Ionicons' && <Ionicons name={iconName} color={color} size={size} />}
        {provider === 'Octicons' && <Octicons name={iconName} color={color} size={size} />}
        {provider === 'Feather' && <Feather name={iconName} color={color} size={size} />}
      </S.StyledPressable>
    </S.IconWrapper>
  )
}
