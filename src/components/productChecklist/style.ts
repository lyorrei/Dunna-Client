import styled from 'styled-components';

export const CheckList = styled.ul`
    margin-top: 3.4rem;
    list-style-type: none;
    font-style: none;

    li {
        padding: 0.5rem 0;
        display: flex;
        align-items: center;

        svg {
            color: ${props => props.theme.colors.primary};
            width: 1.6rem;
            height: 1.6rem;
        }

        span {
            margin-left: 0.8rem;
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.backgroundDark};
        }
    }
`
