import styled from 'styled-components'

export const AddressDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 1rem;
    flex: 1;

    p {
        font-size: 1.6rem;
        font-family: sans-serif;
        line-height: 1.4;

        /* display: grid;
        grid-template-columns: 20% 79%;
        grid-gap: 2rem; */

        span {
            font-weight: 600;
            margin-right: 1rem;
            display: inline-block;
        }
    }
`
