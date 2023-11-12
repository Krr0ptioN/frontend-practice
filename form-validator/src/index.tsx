import { createRoot } from 'react-dom/client';
import './assets/main.css';
import { Form } from './components/Form';


const App = () => {
    return (
        <div className='flex justify-center items-center w-screen h-screen bg-gray-400'>
            <div className='flex flex-col justify-center items-center p-6 h-auto bg-white rounded-md sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4'>
                <h2 className='px-5 text-2xl font-bold'>Sign Up Today!</h2>
                <Form />
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
