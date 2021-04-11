import styled from 'styled-components'

export const Item = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3rem;

    label, p {
        color: ${props => props.theme.colors.greyDark1};
    }

    label {
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: .6rem;
        display: inline-block;
    }

    p {
        font-size: 1.5rem;
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.colors.greyLight4};
    }
`
