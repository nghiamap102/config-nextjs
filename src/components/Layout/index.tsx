import { Box } from '@chakra-ui/react';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { FC } from 'react';

const Layout = ({ children }) => {
    return (
        <Box>
            <Header />
            {children}
            <Footer />
        </Box>
    );
};

export default Layout