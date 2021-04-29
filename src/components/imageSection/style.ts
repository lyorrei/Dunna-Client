import styled from 'styled-components'

interface ContainerProps {
    imageUrl: string
}

export const Container = styled.div<ContainerProps>`
    height: calc(100vh - 6rem);

    background-image: //linear-gradient(to right bottom, rgba(0,194,168, .4), rgb(255,255,255, .4)),
        url(${props => props.imageUrl}); // linear-gradient(to right bottom, white, black), ;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 70% 20%;
`
