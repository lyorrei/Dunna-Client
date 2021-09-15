import React from 'react'
import { PageAlert } from './style'

import { IoMdClose } from 'react-icons/io'

interface Props {
    text: string
    closeAlert(): void
}

const pageAlert: React.FC<Props> = props => {
    return (
        <PageAlert>
            <div>{props.text}</div>
            <IoMdClose onClick={props.closeAlert} />
        </PageAlert>
    )
}

export default pageAlert
