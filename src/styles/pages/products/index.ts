import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
    padding-top: 2rem;
`

export const Container = styled(motion.div)`
    width: 100%;
    padding: 0 6rem;
    position: relative;

    table {
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
    }
`

export const ActionsTd = styled.p`
    .imgg {
        svg {
            fill: green;
        }
    }
    a {
        svg {
            fill: #c4bf29;
            margin-right: 1rem;
        }
    }
    svg {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        transition: all 0.2s;
        fill: red;
        &:hover {
            transform: scale(1.1);
        }
    }
`
