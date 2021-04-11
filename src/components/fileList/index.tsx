import React, { useEffect } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import { Container, FileInfo, Preview } from './style'

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import upload from '../upload'

export interface uploadedFilesInterface {
    file: File
    id: string
    name: string
    readableSize: string
    preview: string
    progress: number
    uploaded: boolean
    error: boolean
    url: any
}

interface Props {
    files: uploadedFilesInterface[]
    onDelete(id: string): void
}

const fileList: React.FC<Props> = ({ files, onDelete }) => {
    return (
        <Container>
            {files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                    <FileInfo>
                        <Preview src={uploadedFile.preview} />
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            <span>
                                {uploadedFile.readableSize}{' '}
                                {!!uploadedFile.url && files.length > 1 && (
                                    <button
                                        onClick={() =>
                                            onDelete(uploadedFile.id)
                                        }
                                    >
                                        Excluir
                                    </button>
                                )}
                            </span>
                        </div>
                    </FileInfo>
                    <div>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#00c2a8' }
                                }}
                                strokeWidth={10}
                                value={uploadedFile.progress}
                            />
                        )}
                        {uploadedFile.url && (
                            <a
                                href="http://localhost:3001/files/184cf307f71dfa914b504a73eb2904cb-J-B0001.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdLink
                                    style={{ marginRight: 8 }}
                                    size={24}
                                    color="#222"
                                />
                            </a>
                        )}

                        {uploadedFile.uploaded && (
                            <MdCheckCircle size={24} color="#00c2a8" />
                        )}
                        {uploadedFile.error && (
                            <MdError size={24} color="#e57878" />
                        )}
                    </div>
                </li>
            ))}
        </Container>
    )
}

export default fileList
