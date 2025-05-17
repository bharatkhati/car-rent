import MultiStepForm from './components/MultiStepForm';
import { Container } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="py-8">
        <MultiStepForm />
      </Container>
      </ThemeProvider>
  );
}

export default App;