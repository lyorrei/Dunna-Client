import styled, { css } from 'styled-components'

const Scroll = css`
    padding-right: 3rem;

    /* width */
    ::-webkit-scrollbar {
        width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.5rem grey;
        border-radius: 1rem;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.primary};
        border-radius: 1rem;
    }
`

export const PageContainer = styled.div`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
    padding-top: 2rem;
`

export const Container = styled.div`
    padding: 0 6rem;
    position: relative;
    width: 60%;
    margin: 0 auto;
`

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 4rem;
`

export const SubTitle = styled.h3`
    font-size: 2rem;
    color: ${props => props.theme.colors.primaryDark};
    margin-bottom: 3rem;
    margin-top: 4rem;

    span {
        color: ${props => props.theme.colors.greyDark1};
        font-family: sans-serif;
        font-weight: 300;
        margin-left: 2rem;
    }
`


export const Total = styled.p`
    font-size: 1.8rem;
    font-weight: 600;
    font-family: sans-serif;
    color: ${props => props.theme.colors.greyDark1};
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
`

export const ButtonContainer = styled.div`
    margin-top: 4rem;
    width: 20%;
    float: right;
`

export const Input = styled.input`
    font-size: 1.6rem;
`
