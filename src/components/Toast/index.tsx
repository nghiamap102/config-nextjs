import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
type Props = {
    
};
export const Toast = (props: Props) => {
    return (
        <ToastContainer position="bottom-center" limit={1} />
    );
};