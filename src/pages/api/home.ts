// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ImageAssets } from '@assets/index'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
    res.status(200).json({
        product: [
            {
                id: '1',
                name: '(Product 16) Sample - Computers & Accessories For Sale',
                rate: Math.round(Math.random() * 5),
                price: 20,
                sale: 10,
                tag: 'favourite',
                sample: [
                    {
                        size: 'l',
                        color: 'black',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                    {
                        size: 'xl',
                        color: 'gray',
                        imageSrc: ImageAssets.Categories1,
                    },
                    {
                        size: 'm',
                        color: 'orange',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                ],
            },
            {
                id: '2',
                name: '(Product 16) Sample - Computers & Accessories For Sale',
                rate: 3.4,
                price: 20,
                sale: 10,
                tag: 'favourite',
                sample: [
                    {
                        size: 'l',
                        color: 'black',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                    {
                        size: 'xl',
                        color: 'gray',
                        imageSrc: ImageAssets.Categories1,
                    },
                    {
                        size: 'm',
                        color: 'orange',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                ],
            },
            {
                id: '3',
                name: '(Product 16) Sample - Computers & Accessories For Sale',
                rate: Math.round(Math.random() * 5),
                price: 20,
                sale: 10,
                tag: 'mall',
                sample: [
                    {
                        size: 'l',
                        color: 'black',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                    {
                        size: 'xl',
                        color: 'gray',
                        imageSrc: ImageAssets.Categories1,
                    },
                    {
                        size: 'm',
                        color: 'orange',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                ],
            },
            {
                id: '4',
                name: '(Product 16) Sample - Computers & Accessories For Sale',
                rate: Math.round(Math.random() * 5),
                price: 20,
                sale: 10,
                tag: 'mall',
                sample: [
                    {
                        size: 'l',
                        color: 'black',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                    {
                        size: 'xl',
                        color: 'gray',
                        imageSrc: ImageAssets.Categories1,
                    },
                    {
                        size: 'm',
                        color: 'orange',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                ],
            },
            {
                id: '5',
                name: '(Product 16) Sample - Computers & Accessories For Sale',
                rate: Math.round(Math.random() * 5),
                price: 20,
                sale: 10,
                tag: 'normal',
                sample: [
                    {
                        size: 'l',
                        color: 'black',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                    {
                        size: 'xl',
                        color: 'gray',
                        imageSrc: ImageAssets.Categories1,
                    },
                    {
                        size: 'm',
                        color: 'orange',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                ],
            },
            {
                id: '6',
                name: '(Product 16) Sample - Computers & Accessories For Sale',
                rate: Math.round(Math.random() * 5),
                price: 20,
                sale: 10,
                tag: 'hot',
                sample: [
                    {
                        size: 'l',
                        color: 'black',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                    {
                        size: 'xl',
                        color: 'gray',
                        imageSrc: ImageAssets.Categories1,
                    },
                    {
                        size: 'm',
                        color: 'orange',
                        imageSrc: ImageAssets.ProuductLoa1,
                    },
                ],
            },
        ],
        payment:[
            {
                method:'cash',
                description : 'Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.'
            },
            {
                method:'momo',
                description : 'Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.'
            },
            {
                method:'paypal',
                description : 'Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.'
            }
        ]
    })
}

export default handler
