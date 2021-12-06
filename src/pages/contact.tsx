import React from 'react'
import Head from 'next/head'

import {
    PageContainer,
    Container,
    Title,
    CommunicationBox,
    Paragraph,
    CommunicationContainer
} from '../styles/pages/contact'

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

const contact: React.FC = () => {
    return (
        <>
            <Head>
                <title>Dunna - Contato</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Informações de contato</Title>
                    <Paragraph>
                        Se tiver qualquer dúvida ou problema, por favor entre em
                        contato conosco pelos seguintes meios de comunicação:
                    </Paragraph>
                    <CommunicationContainer>
                        <CommunicationBox>
                            <span>Email:</span> contato.dunnajewelry@gmail.com
                        </CommunicationBox>
                        <CommunicationBox>
                            <span>Celular e Whatsapp:</span> +55 31 97214-0660
                        </CommunicationBox>
                    </CommunicationContainer>

                    <Paragraph>
                        Estaremos a disposição para respondermos qualquer
                        pergunta nos dias úteis, obrigado por entrar em contato!
                    </Paragraph>
                </Container>
            </PageContainer>
        </>
    )
}

export default contact
