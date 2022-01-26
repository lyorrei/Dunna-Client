import styled from 'styled-components'

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
`

export const SubContainer = styled.div`
    margin-top: 4rem;
    border: 1px solid ${props => props.theme.colors.greyLight4};
    margin-bottom: 3rem;
`
