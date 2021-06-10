import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css';
import Main from './layouts/Main';
import Navbar from './layouts/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Container className="main">
                <Main />
            </Container>
        </div>
    );
}

export default App;