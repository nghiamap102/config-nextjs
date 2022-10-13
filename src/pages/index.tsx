import { Banner } from '@components/Banner';
import { CardBlock } from '@components/Card';
import { Contact } from '@components/Contact';
import { Footer } from '@components/Footer';
import { Navbar } from '@components/Navbar';
import { Projects } from '@components/Projects';
import { Box } from '@mui/material';
import { mainColor } from '@theme/global';
import type { NextPage } from 'next';

const Home: NextPage = ({ content }) => {
    return (
        <>
            <Navbar routes={content?.navbar} style={{ zIndex: '999' }} />
            <Banner
                title='Creative Innovative Design Agency'
                description='Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <Box className='grid grid-cols-2'>
                {content.categories?.map((ele) => (
                    <Projects
                        key={ele.title}
                        more
                        link={ele.title}
                        img={ele.background}
                        description={ele.description}
                        title={ele.title}
                    />
                ))}
            </Box>
            <Box className='relative' sx={{ p: '10% 0', backgroundColor: mainColor.black }}>
                <Box className='sub_title text-center mb-10'>Services</Box>
                <Box className='grid grid-cols-2' sx={{ p: '0 12%' }} >
                    {content.services?.map((ele) => (
                        <CardBlock
                            key={ele.title}
                            price={ele.price}
                            title={ele.title}
                            link={ele.title}
                            description={ele.description}
                        />
                    ))}
                </Box>
            </Box>
            <Box className='relative' sx={{ p: '10% 0', backgroundColor: mainColor.black }}>
                <Box className='sub_title text-center '>Ourteam</Box>
                <Box className='text text-center' sx={{ p: '8%', color: mainColor.grey }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Box>
                <Box className='grid grid-cols-4'>
                    {content.ourteam?.map((ele) => (
                        <Projects
                            style={{ minHeight: '600px' }}
                            key={ele.name}
                            more={false}
                            link={ele.name}
                            img={ele.avatar}
                            description={ele.job}
                            title={ele.job}
                        />
                    ))}
                </Box>
            </Box>
            <Box className='relative' sx={{ p: '10% 0', backgroundColor: mainColor.black, color: mainColor.white }}>
                <Contact routes={content?.contact} />
            </Box>
            <Box className='p-10'>
                <Footer privacy={content?.footer}/>
            </Box>
        </>
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
