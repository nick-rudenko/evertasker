import React, { useContext, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Contexts
import { ThemeContext } from './contexts/ThemeContext';
// Helpers
import { getFromDataset } from './utils/helpers';
// Theme helpers
import {
    composeCurrentTheme,
    getCurrentThemeColor,
    getStyleVariable
} from './theme/helpers';
// Components
import Sidebar from './containers/Sidebar';
import Main from './containers/Main';
import ThemeToggler from './components/ThemeToggler';



function App() {
    const {
        theme: [currentTheme]
    } = useContext(ThemeContext);

    const [openedTaskId, setOpenedTaskId] = useState(null);
    const changeOpenedTaskId = e => setOpenedTaskId(getFromDataset(e, 'id'));

    const isFullView = openedTaskId !== null;

    return (
        <ThemeProvider theme={composeCurrentTheme(currentTheme)}>
            <AppContainerSC>
                <GlobalStyle />
                <ThemeToggler />
                <Sidebar
                    isFullView={isFullView}
                    openedTaskId={openedTaskId}
                    changeOpenedTaskId={changeOpenedTaskId}
                />
                <Main isFullView={isFullView} openedTaskId={openedTaskId} />
            </AppContainerSC>
        </ThemeProvider>
    );
}

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
        font-family: 'Lato', sans-serif;
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        padding: 0;
        position: relative;
    }

    *,
    *:after,
    *:before {
        box-sizing: inherit;
    }
`;

const AppContainerSC = styled.div`
    background: ${getCurrentThemeColor('background')};
    display: flex;
    justify-content: center;
    min-height: 100vh;
    transition: ${getStyleVariable('transitions', 'onToggleTheme')};
    width: 100%;
`;

export default App;
