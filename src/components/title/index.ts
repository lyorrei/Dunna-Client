import styled from 'styled-components'

const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 5rem;

    @media only screen and (max-width: 75em) {
        font-size: 4rem;
        margin-bottom: 4rem;
    } //1200px
`

export default Title
