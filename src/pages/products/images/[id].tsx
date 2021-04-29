import axios from '../../../../axios'
import { NextPageContext } from 'next'
import React, { useState, useEffect } from 'react'
import RequireAuthentication from '../../../HOC/requireAuthentication'
import Head from 'next/head'

import ProductForm from '../../../components/productForm'
import Upload from '../../../components/upload'
import FileList, { uploadedFilesInterface } from '../../../components/fileList'

import { ProductInterface } from '../../../components/product'
import { StonesAndShapes } from '../../shop/products'
import { PageContainer, Container } from '../../../styles/pages/products/edit'
import { InlineButton } from '../../../components/button'
import { useRouter } from 'next/router'
import { uniqueId } from 'lodash'
import fileSize from 'filesize'
import Alert from '../../../components/alert'
import { Types } from '../../../components/alert'

interface Props {
    productImages: any
}

const editImage = ({ productImages }: Props) => {
    const router = useRouter()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setUploadedFiles(
            productImages.map(file => ({
                id: file._id,
                name: file.name,
                readableSize: fileSize(file.size),
                preview: file.url,
                uploaded: true,
                url: file.url
            }))
        )
    }, [])

    const handleUpload = (files: File[]) => {
        const uploadedFilesArray = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: fileSize(file.size),
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

    const editProduct = async () => {
        setLoading(true)

        for (let i = 0; i < uploadedFiles.length; i++) {
            const data = new FormData()

            if (uploadedFiles[i].uploaded) {
                continue
            }
            data.append('file', uploadedFiles[i].file, uploadedFiles[i].name)
            data.append('product', router.query.id.toString())

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
                return setError(e.response.data.error)
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
                <title>Dunna - Editar Images</title>
            </Head>
            <PageContainer>
                <Container>
                    <Upload
                        title="Editar imagens do produto"
                        onUpload={handleUpload}
                    />
                    {error && (
                        <div style={{ margin: '2rem 0' }}>
                            <Alert type={Types.red}>{error}</Alert>
                        </div>
                    )}
                    {!!uploadedFiles.length && (
                        <>
                            <FileList
                                files={uploadedFiles}
                                onDelete={handleDelete}
                            />
                            <InlineButton
                                onClick={editProduct}
                                style={{
                                    width: '20rem',
                                    float: 'right',
                                    marginTop: '2rem'
                                }}
                                disabled={loading}
                            >
                                Editar imagens
                            </InlineButton>
                        </>
                    )}
                </Container>
            </PageContainer>
        </>
    )
}

editImage.getInitialProps = async (ctx: NextPageContext, token: string) => {
    const { data: productImages } = await axios.get(
        '/productimage/product/' + ctx.query.id,
        {
            headers: {
                Cookie: `token=${token};`
            }
        }
    )

    return {
        productImages
    }
}

export default RequireAuthentication(editImage, true)
