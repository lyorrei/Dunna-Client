import styled from 'styled-components'

export const Table = styled.table`
    width: 100%;

    thead {
        & > tr {
            display: flex;

            th {
                flex: 1;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                font-size: 1.8rem;
                color: ${props => props.theme.colors.greyDark1};
                /* margin-right: 3rem; */
                text-align: left;
                padding: 2rem 0;

                span {
                    display: flex;
                    align-items: center;
                    margin-left: 1rem;
                }
            }
        }
    }
    tbody {
        & > tr {
            display: flex;
            td {
                display: flex;
                align-items: center;
                flex: 1;
                padding: 1.8rem 0;
                font-family: sans-serif;
                font-size: 1.5rem;
                border-collapse: collapse;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            }
        }
    }
`

export const Pagination = styled.div`
    display: grid;

    padding-bottom: 4rem;

    margin-top: 2rem;
    grid-template-columns: repeat(5, max-content);
    justify-content: right;
    align-items: center;
    grid-gap: 1rem;

    span {
        font-family: sans-serif;
        display: block;
        font-size: 1.4rem;
        margin-left: auto;
    }
`

const PaginationButtons = styled.button`
    display: block;
    padding: 1rem 1rem;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.greyDark3};
    color: ${props => props.theme.colors.white};
    font-size: 1.4rem;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    cursor: pointer;
    transition: all 1s;
    --webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-0.4rem);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.colors.greyLight4};
        color: ${({ theme }) => theme.colors.greyDark3};
    }
`

export const PreviousPage = styled(PaginationButtons)``

export const NextPage = styled(PaginationButtons)``

export const GotoPage = styled(PaginationButtons)``
