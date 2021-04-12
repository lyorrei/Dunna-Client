import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../axios'

import { uniqueId } from 'lodash'
import filesize from 'filesize'

import Head from 'next/head'
import RequireAuthentication from '../../HOC/requireAuthentication'

import ProductForm from '../../components/productForm'
import Upload from '../../components/upload'
import FileList, { uploadedFilesInterface } from '../../components/fileList'

import { StonesAndShapes } from '../shop'
import { NextPageContext } from 'next'
import { motion } from 'framer-motion'

import {
    PageContainer,
    Container,
    ItemContainer
} from '../../styles/pages/products/new'
import { InlineButton } from '../../components/button'
import { useRouter } from 'next/router'

interface Props {
    stones: StonesAndShapes[]
    shapes: StonesAndShapes[]
}

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

const productFormVariant = {
    hidden: {
        opacity: 0,
        left: '-100vh',
        x: '-50%'
    },
    visible: {
        opacity: 1,
        left: '50%',
        x: '-50%'
    }
}

const newProduct = ({ stones, shapes }: Props) => {
    const router = useRouter()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [stage, setStage] = useState(0)
    const [formData, setFormData] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleUpload = (files: File[]) => {
        const uploadedFilesArray = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }))
        setUploadedFiles([...uploadedFiles, ...uploadedFilesArray])
    }

    const updateFile = (id, data) => {
        const uploadedFilesUpdated = uploadedFiles.map(upload => {
            return id === upload.id ? { ...upload, ...data } : upload
        })

        setUploadedFiles(uploadedFilesUpdated)
    }

    const createProduct = async () => {
        const { data: product } = await axios.post('/product/create', formData)

        for (let i = 0; i < uploadedFiles.length; i++) {
            const data = new FormData()

            data.append('file', uploadedFiles[i].file, uploadedFiles[i].name)
            data.append('product', product._id)

            try {
                const { data: createdProduct } = await axios.post(
                    '/productImage',
                    data,
                    {
                        onUploadProgress: e => {
                            const progress = Math.round(
                                (e.loaded * 100) / e.total
                            )
                            updateFile(uploadedFiles[i].id, { progress })
                        }
                    }
                )
                updateFile(uploadedFiles[i].id, {
                    uploaded: true,
                    id: createdProduct._id,
                    url: createdProduct.url
                })

            } catch (e) {
                updateFile(uploadedFiles[i].id, {
                    error: true
                })
            }
        }
        router.replace('/products')
    }

    const handleDelete = async (id: string) => {
        await axios.delete('/productimage/' + id)
        setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
    }

    return (
        <>
            <Head>
                <title>Dunna - Novo produto</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                animate="visible"
                exit="hidden"
            >
                <Container>
                    <ItemContainer
                        variants={productFormVariant}
                        animate={stage === 0 ? 'visible' : 'hidden'}
                        exit="hidden"
                    >
                        <ProductForm
                            noLoading
                            submitLink="/product/create"
                            title="Criar Produto"
                            shapes={shapes}
                            stones={stones}
                            setFormData={setFormData}
                            setStage={setStage}
                        />
                    </ItemContainer>
                    <ItemContainer
                        variants={productFormVariant}
                        animate={stage === 1 ? 'visible' : 'hidden'}
                        exit="hidden"
                    >
                        <Upload
                            title="Adicionar imagem do produto"
                            onUpload={handleUpload}
                        />
                        {!!uploadedFiles.length && (
                            <>
                                <FileList
                                    files={uploadedFiles}
                                    onDelete={handleDelete}
                                />
                                <InlineButton
                                    onClick={createProduct}
                                    style={{
                                        width: '20rem',
                                        float: 'right',
                                        marginTop: '2rem'
                                    }}
                                >
                                    Adicionar Produto
                                </InlineButton>
                            </>
                        )}
                        <InlineButton
                            onClick={() => setStage(0)}
                            style={{
                                width: '10rem',
                                float: 'right',
                                marginTop: '2rem',
                                marginRight: '1rem'
                            }}
                            light
                        >
                            Voltar
                        </InlineButton>
                    </ItemContainer>
                </Container>
            </PageContainer>
        </>
    )
}

newProduct.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: stones } = await axios.get('/stones', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    const { data: shapes } = await axios.get('/shapes', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    return {
        stones,
        shapes
        // will be passed to the page component as props
    }
}

export default RequireAuthentication(newProduct, true)
