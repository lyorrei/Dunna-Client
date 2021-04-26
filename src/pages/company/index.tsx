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

interface Props {}

const company: React.FC<Props> = props => {
    return (
        <>
            <Head>
                <title>Dunna - Empresa</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Company>
                    <Container>
                        <Content>
                            <TitleContainer>
                                <h2>Sobre a empresa</h2>
                            </TitleContainer>
                            <TextContainer>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Possimus magni, autem
                                    aperiam, nobis quaerat quia culpa veritatis
                                    odit dolores iusto perspiciatis laboriosam
                                    assumenda asperiores earum ex voluptas
                                    corrupti, illum quibusdam Lorem ipsum dolor
                                    sit amet consectetur adipisicing elit.
                                    Veniam, architecto. Nihil, ad nisi quos
                                    veniam illum tenetur ullam natus
                                    exercitationem ducimus nulla accusamus ipsam
                                    optio perferendis repellendus doloremque
                                    quisquam aut Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Repellat, eius
                                    sint blanditiis quae quasi illum accusantium
                                    ab doloremque doloribus et numquam hic
                                    ducimus consequatur nesciunt quaerat.
                                    Possimus aut commodi sapiente.
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
