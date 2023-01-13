import { Box, BoxProps } from "@chakra-ui/react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FC } from 'react'


const PaypalButton: FC<BoxProps> = ({ ...props }) => {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01"
                    }
                }
            ]
        });
    }

    const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: "vertical" },
        onApprove(data, actions) {
            /**
             * data: {
             *   orderID: string;
             *   payerID: string;
             *   paymentID: string | null;
             *   billingToken: string | null;
             *   facilitatorAccesstoken: string;
             * }
             */
            return actions.order.capture({}).then((details) => {
                alert(
                    "Transaction completed by" +
                    (details?.payer.name.given_name && "No details")
                );

                alert("Data details: " + JSON.stringify(data, null, 2));
            });
        }
    };
    return (
        <Box {...props}>
            {isPending ? <h2>Load Smart Payment Button...</h2> : null}
            <PayPalButtons {...paypalbuttonTransactionProps} />
        </Box>
    );
}


export default PaypalButton