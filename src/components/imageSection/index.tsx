import React from 'react'
import { Container, TextContainer } from './style'
import Image from '../../images/imageSection.jpg'
import { NoBackgroundButton } from '../button'
import Link from 'next/link'

const imageSection: React.FC = () => {
    return (
        <Container imageUrl={Image}>
            <TextContainer>
                <h2>Uma nova joalheria</h2>
                <p>
                    A Dunna é uma nova empresa que veio para introduzir um novo
                    tipo de lapidação... Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Laborum sequi pariatur soluta excepturi
                    debitis ut asperiores earum, odio reiciendis in, quaerat
                    eveniet illo atque. Magnam quidem excepturi incidunt
                    consequuntur pariatur.
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
