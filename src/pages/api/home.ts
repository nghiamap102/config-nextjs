// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ImageAssets } from '@assets/index'
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
    res.status(200).json(
        {
            product: [
                {
                    id: '1',
                    name: '(Product 16) Sample - Computers & Accessories For Sale',
                    rate: Math.round(Math.random() * 5),
                    price: 20,
                    sale: 10,
                    tag: 'hot',
                    sample: [
                        {
                            size: 'l',
                            color: 'black',
                            imageSrc: ImageAssets.ProuductLoa1
                        },
                        {
                            size: 'xl',
                            color: 'gray',
                            imageSrc: ImageAssets.Categories1
                        },
                        {
                            size: 'm',
                            color: 'orange',
                            imageSrc: ImageAssets.ProuductLoa1
                        }
                    ],
                },
                {
                    id: '2',
                    name: '(Product 16) Sample - Computers & Accessories For Sale',
                    rate: Math.round(Math.random() * 5),
                    price: 20,
                    sale: 10,
                    tag: 'hot',
                    sample: [
                        {
                            size: 'l',
                            color: 'black',
                            imageSrc: ImageAssets.ProuductLoa1
                        },
                        {
                            size: 'xl',
                            color: 'gray',
                            imageSrc: ImageAssets.Categories1
                        },
                        {
                            size: 'm',
                            color: 'orange',
                            imageSrc: ImageAssets.ProuductLoa1
                        }
                    ],
                },
                {
                    id: '3',
                    name: '(Product 16) Sample - Computers & Accessories For Sale',
                    rate: Math.round(Math.random() * 5),
                    price: 20,
                    sale: 10,
                    tag: 'hot',
                    sample: [
                        {
                            size: 'l',
                            color: 'black',
                            imageSrc: ImageAssets.ProuductLoa1
                        },
                        {
                            size: 'xl',
                            color: 'gray',
                            imageSrc: ImageAssets.Categories1
                        },
                        {
                            size: 'm',
                            color: 'orange',
                            imageSrc: ImageAssets.ProuductLoa1
                        }
                    ],
                },
                {
                    id: '4',
                    name: '(Product 16) Sample - Computers & Accessories For Sale',
                    rate: Math.round(Math.random() * 5),
                    price: 20,
                    sale: 10,
                    tag: 'hot',
                    sample: [
                        {
                            size: 'l',
                            color: 'black',
                            imageSrc: ImageAssets.ProuductLoa1
                        },
                        {
                            size: 'xl',
                            color: 'gray',
                            imageSrc: ImageAssets.Categories1
                        },
                        {
                            size: 'm',
                            color: 'orange',
                            imageSrc: ImageAssets.ProuductLoa1
                        }
                    ],
                },
                {
                    id: '5',
                    name: '(Product 16) Sample - Computers & Accessories For Sale',
                    rate: Math.round(Math.random() * 5),
                    price: 20,
                    sale: 10,
                    tag: 'hot',
                    sample: [
                        {
                            size: 'l',
                            color: 'black',
                            imageSrc: ImageAssets.ProuductLoa1
                        },
                        {
                            size: 'xl',
                            color: 'gray',
                            imageSrc: ImageAssets.Categories1
                        },
                        {
                            size: 'm',
                            color: 'orange',
                            imageSrc: ImageAssets.ProuductLoa1
                        }
                    ],
                }
            ],
        }
    )
}


export default handler 