import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

export const AddressBox = styled.div`
    border: 1px solid ${props => props.theme.colors.greyDark3};
    padding: 4rem;
    position: relative;

    p {
        &:first-child {
            font-weight: 700;
            font-size: 1.8rem;
        }

        color: ${props => props.theme.colors.greyDark1};
        font-size: 1.6rem;
        padding: 0.5rem 0;

        font-family: sans-serif;
    }

    div {
        position: absolute;
        bottom: 6%;
        right: 4%;
        display: flex;
        align-items: center;

        svg {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
`

export const EditIcon = styled(FaEdit)`
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    fill: yellow; // #ffff00;
`

export const TrashIcon = styled(FaTrash)`
    width: 2.5rem;
    height: 2.2rem;
    fill: red;
`
