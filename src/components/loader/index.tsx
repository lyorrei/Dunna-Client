import React from 'react'
import { ClipLoader } from 'react-spinners'
import { LoaderContainer } from './style'


const loader: React.FC = () => {
    return (
        <LoaderContainer>
            <ClipLoader color={'#00c2a8'} size={120} />
        </LoaderContainer>
    )
}

export default loader
