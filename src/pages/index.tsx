import { Box } from '@chakra-ui/react';
import Header from '@components/Header';
import MainContent from '@components/MainContent';
import type { NextPage } from 'next';

const Home: NextPage = ({ content }) => {
    return (
        <Box>
            <Header />
            <MainContent/>
        </Box>
    )
}


export async function getServerSideProps() {
    const res = await fetch('http://localhost:3030/api/home')
    const content = await res.json();

    return {
        props: {
            content
        },
    }
}

export default Home
