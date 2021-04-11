import styled from 'styled-components'
import { Form as Unform } from '@unform/web'
import InputRange from 'react-input-range'

export const Form = styled(Unform)`
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));

    padding: 1rem 0;
    margin-bottom: 1rem;

    & > div {
        border: 1px solid ${props => props.theme.colors.greyLight4};
    }
`

export const RangeSliderContainer = styled.div`
    padding: 2rem;
    display: flex;
    align-items: center;
    height: 100%;

    h3 {
        margin-right: 2.5rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: ${props => props.theme.colors.greyDark1};
    }

    .input-range__label--value {
        font-size: 1.2rem;
        left: -1rem;
        top: -2.2rem;
        color: ${props => props.theme.colors.greyDark2};
    }

    .input-range__label--min,
    .input-range__label--max {
        font-size: 1.1rem;
        top: 1.4rem;
        color: ${props => props.theme.colors.greyDark2};
    }

    .input-range__track--active,
    .input-range__slider {
        background: ${props => props.theme.colors.primary};
        border-color: ${props => props.theme.colors.primary};
    }
`
