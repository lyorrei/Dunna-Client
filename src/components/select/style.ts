export const customStyles = {
    container: (provided, state) => ({
        ...provided
    }),
    control: (provided, state) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.8rem 1rem',
        fontSize: ' 1.8rem',
        outline: 'none',
        borderRadius: '3px',
        fontFamily: 'Raleway',
        width: '100%',
        color: '#333',
        border: 'none',
        transition: ' all 100ms',
        minHeight: '38px',
        background: 'transparent'
    }),
    option: (provided, state) => ({
        padding: '1.2rem 1rem',
        fontSize: '1.8rem',
        backgroundColor: state.isSelected ? '#ccc' : null,
        color: '#000',

        '&:hover': {
            backgroundColor: '#f0eeee'
        }
    }),
    placeholder: (provided, state) => ({
        fontSize: '1.8rem',
        fontFamily: 'Raleway'
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        fontSize: '1.8rem',
        fontFamily: 'Raleway'
    })
}

export const inputStyles = {
    container: (provided, state) => ({
        ...provided
    }),
    control: (provided, state) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.4rem 1rem',
        fontSize: ' 1.4rem',
        outline: 'none',
        borderRadius: '3px',
        fontFamily: 'Raleway',
        width: '100%',
        color: '#333',
        transition: ' all 100ms',
        minHeight: '38px',
        background: 'transparent',
        borderBottom: '1px solid #999'
    }),
    option: (provided, state) => ({
        padding: '1.2rem 1rem',
        fontSize: '1.4rem',
        backgroundColor: state.isSelected ? '#ccc' : null,
        color: '#000',

        '&:hover': {
            backgroundColor: '#f0eeee'
        }
    }),
    placeholder: (provided, state) => ({
        fontSize: '1.4rem',
        fontFamily: 'Raleway'
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        fontSize: '1.4rem',
        fontFamily: 'Raleway'
    })
}




