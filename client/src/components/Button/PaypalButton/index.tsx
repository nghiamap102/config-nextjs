import { PayPalButtons, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import { FC } from 'react';


const PaypalButton: FC<PayPalButtonsComponentProps> = ({ ...props }) => {
    return (
        <PayPalButtons {...props}/>
    );
}


export default PaypalButton