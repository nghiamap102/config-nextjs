import { Box } from '@chakra-ui/react';
import MiniChat from '@components/Chat/MiniChat';
import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import { FC } from 'react';

const Layout: FC<any> = ({ children }) => {
    return (
        <Box className='relative'>
            <Header />
            {children}
            <Footer/>
            <MiniChat/>
        </Box>
    );
};

export default Layout