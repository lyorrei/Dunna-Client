import styled from 'styled-components';

export const LoginTitle = styled.h4`
    font-size: 2.8rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-weight: 300;
    text-align: center;
    color: ${props => props.theme.colors.primary};

    transition: all .2s;

    &:hover {
        transform: scale(1.05);
    }
`;
