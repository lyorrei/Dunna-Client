import React from 'react'
import Head from 'next/head'

import {
    PageContainer,
    Company,
    Container,
    Content,
    TextContainer,
    TitleContainer
} from '../../styles/pages/company'
import { pageContainerVariant } from '../../components/PageContainers'
import Image from '../../images/company.jpg'

interface Props {}

const company: React.FC<Props> = props => {
    return (
        <>
            <Head>
                <title>DUNNA® | Empresa</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Company>
                    <Container imageUrl={Image}>
                        <Content>
                            <TitleContainer>
                                <h2>Sobre a empresa</h2>
                            </TitleContainer>
                            <TextContainer>
                                <p>
                                    A DUNNA jewelry é uma empresa que veio para
                                    inovar o mercado de jóias finas no Brasil.
                                    Com foco nas pedras preciosas nacionais e
                                    padrão de qualidade internacional, buscamos
                                    valorizar o design e a delicadeza das peças.
                                    Utilizamos gemas e diamantes selecionados.
                                    Nossas jóias possuem excelência em
                                    acabamento e garantia de qualidade. Apesar
                                    de jovem, esta é uma empresa que conta com
                                    uma fundadora muito experiente no ramo, que
                                    atua no mercado de alta joalheria em Tóquio,
                                    no Japão, há quase 30 anos.
                                    <br />
                                    <span>
                                        DUNNA jewelry is a company that came to
                                        innovate the fine jewelry market in
                                        Brazil. Focusing on ethically sourced
                                        gems and international quality standard,
                                        we seek to value the design and delicacy
                                        of the pieces. Our jewels have
                                        excellence and quality assurance.
                                        Although young, this is a company with a
                                        very experienced founder, who has been
                                        operating in the high jewelry market in
                                        Tokyo (Japan) for almost 30 years.
                                    </span>
                                </p>
                            </TextContainer>
                        </Content>
                    </Container>
                </Company>
            </PageContainer>
        </>
    )
}

export default company
