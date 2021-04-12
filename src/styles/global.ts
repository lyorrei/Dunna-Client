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

        @media only screen and (max-width: 75em) {
            font-size: 56.25%; //1 rem = 9px, 9/16 = 50%
        } //1200px

        @media only screen and (max-width: 56.25em) {
            font-size: 50%; //1 rem = 8px, 8/16 = 50%
        } //900px

        @media only screen and (max-width: 37.5em) {
            font-size: 43.75%; //1 rem = 7px, 7/16 = 43.75%
        } //600px
	}

    body {
        background-color: ${({ theme }) => theme.colors.greyLight4};
        font-family: 'Raleway', sans-serif;
        color: ${props => props.theme.colors.greyDark2};
        min-height: 100vh;
    }
`
