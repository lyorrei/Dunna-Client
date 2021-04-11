import styled from 'styled-components'

export const Container = styled.div`
    margin-top: 2rem;
    font-family: sans-serif;
    max-height: 55vh;
    overflow-y: auto;
    padding-right: 2rem;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;
        font-size: 1.6rem;

        & + li {
            margin-top: 1.5rem;
        }
    }

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

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 1.2rem;
            color: #999;
            margin-top: 0.5rem;

            button {
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 0.5rem;
                cursor: pointer;
            }
        }
    }
`

interface PreviewProps {
    src: string
}

export const Preview = styled.div<PreviewProps>`
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    background-image: url("${props => props.src}");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 1rem;
`
