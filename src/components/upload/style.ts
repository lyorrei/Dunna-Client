import styled, { css } from 'styled-components'

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 4rem;
`

const dragActive = css`
    border: 1px dashed ${props => props.theme.colors.primary};
`

const dragReject = css`
    border: 1px dashed #e57878;
`

interface DropContainerProps {
    isDragActive: boolean
    isDragReject: boolean
}

export const DropContainer = styled.div<DropContainerProps>`
    border: 1px dashed #ccc;
    border-radius: 3px;
    cursor: pointer;
    transition: height 0.2s ease;
    outline: none;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
`

interface UploadMessageProps {
    type?: string
}

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#00c2a8'
}

export const UploadMessage = styled.p<UploadMessageProps>`
    display: flex;
    color: ${props => messageColors[props.type || 'default']};
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    font-size: 1.6rem;
`
