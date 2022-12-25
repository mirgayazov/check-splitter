import * as S from './styles'

export const Button = ({ onPress, align, textColor, title, wrapperStyle }) => {
  return (
    <S.ButtonWrapper alignItems={align} style={wrapperStyle}>
      <S.StyledPressable onPress={onPress}>
        <S.StyledText textColor={textColor}>
          {title}
        </S.StyledText>
      </S.StyledPressable>
    </S.ButtonWrapper>
  )
}
