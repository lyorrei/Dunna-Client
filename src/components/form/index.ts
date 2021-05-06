import styled from 'styled-components'
import { Form as Unform } from '@unform/web'

const Form = styled(Unform)`
    display: grid;
    grid-gap: 2rem;
    align-items: center;

    span {
        font-size: 1.6rem;
        color: ${props => props.theme.colors.greyDark1};
    }

    a,
    a:link,
    a:visited {
        justify-self: end;
        font-size: 1.6rem;
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.05);
        }
    }
`

export default Form
