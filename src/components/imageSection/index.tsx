import React from 'react'
import { Container, TextContainer } from './style'
import Image from '../../images/imageSection.jpg'
import { NoBackgroundButton } from '../button'
import Link from 'next/link'

const imageSection: React.FC = () => {
    return (
        <Container imageUrl={Image}>
            <TextContainer>
                <h2>Um novo conceito</h2>
                <p>
                    As joias Dunna são leves e versáteis, componhem tanto o look
                    para o dia a dia quanto para festas, tendo as pedras
                    coloridas como elemento central e o diamante como
                    coadjuvante para adornar e enaltecer a gema.
                </p>
                <div>
                    <Link href="/company">
                        <NoBackgroundButton>Saber mais</NoBackgroundButton>
                    </Link>
                </div>
            </TextContainer>
        </Container>
    )
}

export default imageSection
