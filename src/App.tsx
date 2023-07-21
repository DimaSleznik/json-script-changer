
import './App.css'
import MainContainer from "./components/MainContainer.tsx";
import {ThemeProvider} from '@mui/material';
import muiTheme from './theme/muiTheme.ts';

function App() {

  return (
      <div>
        <ThemeProvider theme={muiTheme}>
       <MainContainer/>
        </ThemeProvider>
      </div>
  )
}

export default App
