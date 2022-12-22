import { Container, Table, TableCaption, TableContainer, Tbody, Tfoot } from "@chakra-ui/react";
import CheckoutItem from "@components/Checkout";
import Header from "@components/Header";
import { selectCart } from "@redux/cart/cartSlice";
import { useAppSelector } from "@redux/hooks";
import { FC, useEffect, useState } from "react";

const CheckoutPage: FC = () => {

    const cartSelector = useAppSelector(selectCart)
    const [checkout, setCheckout] = useState<any[]>([])

    useEffect(() => {
        setCheckout(JSON.parse(sessionStorage.getItem('checkout')))
    }, [])

    return (
        <>
            <Header />
            <Container my={5}>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Tbody>
                            {checkout.length > 0 && checkout?.map(item => (
                                <CheckoutItem key={item.product.id} item={item} />
                            ))}
                        </Tbody>
                        <Tfoot>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default CheckoutPage