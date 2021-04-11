import React from 'react'

import { AiOutlineClose } from 'react-icons/ai'

import { AnimatePresence } from 'framer-motion'

import Backdrop from '../backdrop'
import { Modal, ModalHeader, ModalBody } from './style'

interface Props {
    title: string
    show: boolean
    closeModal: () => void
}

const modalVariant = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        x: '-50%',
        y: '-50%',
        transition: {
            duration: 0.6
        }
    },

    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6
        }
    }
}

const modal: React.FC<Props> = props => (
    <>
        <Backdrop show={props.show} click={props.closeModal} />

        <AnimatePresence>
            {props.show && (
                <Modal
                    variants={modalVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <ModalHeader>
                        <h5>{props.title}</h5>
                        <AiOutlineClose onClick={props.closeModal} />
                    </ModalHeader>
                    <ModalBody>{props.children}</ModalBody>
                </Modal>
            )}
        </AnimatePresence>
    </>
)

export default modal
