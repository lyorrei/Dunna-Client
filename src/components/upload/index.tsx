import React from 'react'

import Dropzone from 'react-dropzone'
import { getIn } from 'yup/lib/util/reach'
import { DropContainer, UploadMessage } from './style'

import { Title } from './style'

interface Props {
    title: string
    onUpload(files: File[]): void
}

const upload: React.FC<Props> = ({ title, onUpload }) => {
    const renderDragMessage = (
        isDragActive: boolean,
        isDragReject: boolean
    ) => {
        if (!isDragActive) {
            return <UploadMessage>Arraste seus arquivos aqui...</UploadMessage>
        }

        if (isDragReject) {
            return (
                <UploadMessage type="error">
                    Arquivo não suportado
                </UploadMessage>
            )
        }

        return (
            <UploadMessage type="success">
                Solte seus arquivos aqui
            </UploadMessage>
        )
    }
    return (
        <>
            <Title>{title}</Title>
            <Dropzone accept="image/*" onDropAccepted={onUpload} maxSize={5242880}>
                {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject
                }) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone>
        </>
    )
}

export default upload
