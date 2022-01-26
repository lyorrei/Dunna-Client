import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash } from 'react-icons/fa'

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 4rem;

`

export const SubContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
    grid-template-rows: 30rem;
    grid-auto-rows: 30rem;
    grid-gap: 2rem;
`


export const NewAddressBox = styled.div`
    border-style: dashed;
    border-width: 2px;
    border-color: ${props => props.theme.colors.greyDark3};

    display: grid;
    grid-template-rows: repeat(2, min-content);
    justify-content: center;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    cursor: pointer;

    svg {
        width: 12rem;
        height: 12rem;
        fill: ${props => props.theme.colors.greyLight4};
    }

    p {
        font-size: 2.4rem;
    }
`
