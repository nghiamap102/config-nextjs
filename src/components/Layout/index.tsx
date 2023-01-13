import { Box } from '@chakra-ui/react';
import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
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