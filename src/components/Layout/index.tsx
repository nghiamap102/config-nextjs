import { Box } from '@chakra-ui/react';
import MiniChat from '@components/Chat/MiniChat';
import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const Layout: FC<any> = ({ children }) => {
    const { data: session } = useSession()
    return (
        <Box className='relative'>
            <Header />
            {children}
            <Footer />
            {session?.user && <MiniChat />}
        </Box>
    );
};

export default Layout