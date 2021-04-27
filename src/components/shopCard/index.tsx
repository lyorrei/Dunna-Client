import React from 'react'
import { Card } from './style'

import Link from 'next/link'

interface Props {
    title: string
    imageUrl: string
    link: string
    description: string
}

const shopCard: React.FC<Props> = ({ title, imageUrl, link, description }) => {
    return (
        <Card>
            <figure>
                <img src={imageUrl} alt="Image" />
                {/* <div>
                    <Link href={link}><a>Comprar</a></Link>
                </div> */}
                {/* <figcaption>{description}</figcaption> */}
            </figure>
            <h4>{title}</h4>
        </Card>
    )
}

export default shopCard
