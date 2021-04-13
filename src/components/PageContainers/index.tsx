import React from 'react'
import { PageContainer as PageContainerStyle, Container } from './style'

const pageContainerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
}

const PageContainer: React.FC = props => {
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

export default PageContainer
