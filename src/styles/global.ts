import { createGlobalStyle } from 'styled-components'

import 'react-circular-progressbar/dist/styles.css'

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}

	html {
		font-size: 62.5%;
		box-sizing: border-box;
	}

    body {
        background-color: ${({ theme }) => theme.colors.greyLight4};
        font-family: 'Raleway', sans-serif;
        color: ${props => props.theme.colors.greyDark2};
        min-height: 100vh;
    }
`
