import Layout from '@components/Layout';
import ProductItem from '@components/Product/ProductItem';
import { Store } from '@utils/Store';
import axios from 'axios';
import type { NextPage } from 'next';
import { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';

const Home: NextPage = ({ data }) => {

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const addToCartHandler = async (product: any) => {
        const existItem = cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        // const { data } = await axios.get(`/api/products/${product._id}`);

        // if (data.countInStock < quantity) {
        //     return toast.error('Sorry. Product is out of stock');
        // }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

        toast.success('Product added to the cart');
    };

    return (
        <>
            <Layout title="Home Page">
                {/* <Carousel showThumbs={false} autoPlay>
                    {featuredProducts.map((product) => (
                        <div key={product._id}>
                            <Link href={`/product/${product.slug}`} passHref>
                                <a className="flex">
                                    <img src={product.banner} alt={product.name} />
                                </a>
                            </Link>
                        </div>
                    ))}
                </Carousel> */}
                <h2 className="h2 my-4">Latest Products</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {data.products?.map((product) => (
                        <ProductItem
                            product={product}
                            key={product.slug}
                            addToCartHandler={addToCartHandler}
                        ></ProductItem>
                    ))}
                </div>
            </Layout>
        </>
    )
}


export async function getServerSideProps() {
    const res = await fetch('http://localhost:3030/api/home')
    const data = await res.json();

    return {
        props: {
            data
        },
    }
}

export default Home
