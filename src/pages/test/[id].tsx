import { useRouter } from 'next/router'

type Props = {}
const Test = ({ props }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    console.log(router)
    return <div>abc</div>
}

export async function getStaticPaths() {
    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        // Enable statically generating additional pages
        // For example: `/posts/3`
        fallback: true,
    }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    return {
        props: { params },
    }
}

export default Test
