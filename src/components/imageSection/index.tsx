import React from 'react'
import { Container } from './style'
import Teste from '../../images/teste2.jpg'

interface Props {}

const imageSection: React.FC<Props> = props => {
    return <Container imageUrl={Teste}>tetes</Container>
}

export default imageSection
