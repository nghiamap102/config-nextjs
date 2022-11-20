import type { NextPage } from 'next';
import HomePage from 'view/Home';

const Home: NextPage = ({ content }) => {
    return <HomePage/>
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
