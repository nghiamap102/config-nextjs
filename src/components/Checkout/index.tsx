import { NoImage } from "@assets/image";
import { Td, Text, Tr } from "@chakra-ui/react";
import { ICartItem } from "@redux/cart/cartModel";
import Image from "next/image";
import { FC } from "react";

type CheckoutItemProps = {
    item: ICartItem
};
const CheckoutItem: FC<CheckoutItemProps> = ({
    item
}) => {
    return (
        <Tr>
            <Td maxW='20'>
                <Image src={item?.product?.sample && item?.product?.sample[0].imageSrc || NoImage} alt={item?.product?.name} height={200} width={200} />
            </Td>
            <Td>
                <Text>{item.product.name}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.type?.anotherType}</Text>
                <Text>{item.type?.color}</Text>
                <Text>{item.type?.size}</Text>
                <Text>{item.type?.type}</Text>
            </Td>
            <Td>
                {item.product.sale && item.product.sale > 0 ? <Text>{item.product.price}</Text> : <Text>{item.product.price}</Text>}
            </Td>
        </Tr>
    );
};
export default CheckoutItem