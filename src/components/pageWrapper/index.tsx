import React from 'react'
import { PageContainerStyle, Container } from './style'

export const pageContainerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
}

const PageContainers: React.FC = props => {
    return (
        <PageContainerStyle
            variants={pageContainerVariant}
            initial="hidden"
            animate="visible"
        >
            <Container>{props.children}</Container>
        </PageContainerStyle>
    )
}

export default PageContainers
