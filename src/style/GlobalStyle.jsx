import { createGlobalStyle } from 'styled-components'
import colors from './color'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: ${colors.primary};
    }

    body {
        margin: 0;
    }
    #root {
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .error-msg {
        opacity: 0;
        margin-top: 3px;
        color: ${colors.red};
        font-size: .7rem;
    }
    
    .error-show {
        opacity: 1;
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle