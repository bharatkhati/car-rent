import MultiStepForm from './components/MultiStepForm';
import { Container } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
"./App.css"
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="py-8">
        <div  className="form-main-wrapper">
        <MultiStepForm />
        </div>
      </Container>
     </ThemeProvider>
  );
}

export default App;