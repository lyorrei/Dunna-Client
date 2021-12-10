import styled from 'styled-components'

export const InputGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;

    @media only screen and (max-width: 37.5em) {
        grid-template-columns: 1fr;
    } //600px
`

export const SignupTitle = styled.h4`
  font-size: 2.4rem;
    margin: 1rem 0;
    font-weight: 300;
    text-align: center;
`;
