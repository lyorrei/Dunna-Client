import React from 'react'
import { Container, TextContainer, ImageContainer } from './style'
import Image from '../../images/vogue.jpeg'

const vogueSection: React.FC = () => {
    return (
        <Container>
            <TextContainer>
                <h3>Dunna na Vogue</h3>
                <p>
                A novíssima DUNNA nasceu em 2019, mas traz na bagagem toda a sofisticação da alta joalheria japonesa dos últimos 30 anos. A marca mineira com sede em Belo Horizonte, que tem a geóloga Nilza Quintão como sócia fundadora, é irmã da japonesa Shono, marca de jóias de seu companheiro de vida e trabalho, Yoshihiro Shono. No DNA de ambas, a busca pela lapidação perfeita. "Cada pedra é selecionada e lapidada respeitando suas características óticas e cristalográficas de maneira a extrair de sua estrutura cristalina o mais puro brilho”. Leves e delicadas, as jóias da Dunna têm as pedras brasileiras como elemento central, e o diamante surge como coadjuvante com o papel de adornar e enaltecer a gema. Versáteis, compõem tanto looks para o dia a dia como para o casamento.
                </p>
            </TextContainer>

            <ImageContainer>
                <img
                    src={Image} //"https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg"
                    alt="Vogue"
                />
            </ImageContainer>
        </Container>
    )
}

export default vogueSection
