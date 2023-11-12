import { createRoot } from 'react-dom/client';
import './assets/main.css';
import { Form } from './components/Form';


const App = () => {
    return (
        <div className='flex justify-center items-center w-screen h-screen bg-gray-400'>
            <div className='flex flex-col justify-center items-center p-6 w-1/3 h-auto bg-white rounded-md'>
                <h2 className='px-5 text-2xl font-bold'>Sign Up Today!</h2>
                <Form />
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
