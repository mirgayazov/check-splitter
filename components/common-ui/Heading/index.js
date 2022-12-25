import * as S from './styles'

export const Heading = ({ align, title, wrapperStyle }) => {
  return (
    <S.HeadingWrapper alignItems={align} style={wrapperStyle}>
      <S.StyledText>
        {title}
      </S.StyledText>
    </S.HeadingWrapper>
  )
}
