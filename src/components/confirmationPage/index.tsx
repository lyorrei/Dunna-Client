import React from 'react'

import Link from 'next/link'

import Title from '../../components/title'
import PageContainers from '../../components/pageContainers'
import { InlineButton } from '../../components/button'

import ButtonContainer from '../buttonContainer'

interface Props {
    title: string
    subTitle: string
    link: string
    linkName: string
}

const confirmation: React.FC<Props> = ({ title, subTitle, link, linkName }) => {
    return (
        <>
            <PageContainers>
                <Title>{title}</Title>
                <p style={{ fontSize: '1.8rem' }}>{subTitle}</p>
                <ButtonContainer>
                    <div>
                        <Link href={link}>
                            <a>
                                <InlineButton>{linkName}</InlineButton>
                            </a>
                        </Link>
                    </div>
                </ButtonContainer>
            </PageContainers>
        </>
    )
}

export default confirmation
