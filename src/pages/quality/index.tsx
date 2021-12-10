import React from 'react'
import Head from 'next/head'

import {
    PageContainer,
    Title,
    Container,
    WhiteContainer,
    TextContainer,
    ImageContainer,
    Img1,
    Img2,
    Img3
} from '../../styles/pages/quality'
import { pageContainerVariant } from '../../components/PageContainers'

import Image1 from '../../images/quality-1.jpg'
import Image2 from '../../images/quality-2.jpg'
import Image3 from '../../images/quality-3.jpg'

const quality: React.FC = () => {
    return (
        <>
            <Head>
                <title>DUNNA® | Qualidade</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                animate="visible"
                initial="hidden"
            >
                <WhiteContainer>
                    <Title>O começo de tudo</Title>
                    <Container>
                        <TextContainer>
                            <h3>Nossa Qualidade começa nas minas</h3>
                            <p>
                                Tudo se inicia com a seleção das gemas brutas,
                                retiradas das minas brasileiras.
                                <br />
                                <br />
                                Temos uma experiente geóloga como
                                sócia-fundadora, que há mais de 30 anos trabalha
                                na pesquisa e desenvolvimento da produção
                                mineral no Brasil. O trabalho de forma ética
                                junto às minas é um grande orgulho de nossa
                                empresa.
                                <br />
                                <br />
                                As jóias Dunna® possuem design inspirado nas
                                formas e cores da natureza, especialmente em
                                tudo que nos remete à Brasilidade.
                            </p>
                            <h3>Brasilidade</h3>
                            <p>
                                Toda pedra tem a sua história.
                                <br />
                                <br />
                                Desde as minas, elas percorrem um longo caminho até se tornarem elemento central em uma jóia. Cada etapa deste processo deve ser feito de forma ética e sustentável, para que o resultado final seja uma peça carregada de brasilidade . Em cada jóia um retrato de muitos cantos do Brasil.
                                <br />
                                <br />
                                Na vastidão do nordeste,  as riquezas brotam da terra e encantam o olhar não apenas com o mar azul e o verde da mata atlântica, mas também com as cores vívidas da Turmalina Paraíba
                                <br/>
                                <br/>
                                Nas montanhas de Minas, são extraídas gemas que impressionam viajantes de todo o mundo há seculos. São esmeraldas, diamantes, águas-marinhas, turmalinas, topázios, alexandritas, kunzitas, citrinos e uma dezena de outras gemas pouco conhecidas no país, mas incrivelmente valorizadas no exterior.
                            </p>
                        </TextContainer>
                        <ImageContainer>
                            <Img1 src={Image2} />
                            <Img2 src={Image3} />
                            <Img3 src={Image1} />
                        </ImageContainer>
                    </Container>
                </WhiteContainer>
            </PageContainer>
        </>
    )
}

export default quality
