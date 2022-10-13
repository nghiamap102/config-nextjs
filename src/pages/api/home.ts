// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    res.status(200).json(
        {
            navbar: [
                {
                    name: 'work',
                    link: 'work'
                },
                {
                    name: 'services',
                    link: 'services'
                },
                {
                    name: 'contact',
                    link: 'contact'
                },
            ],

            categories: [
                {
                    background: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897587/Rectangle_1_xhogwi.png',
                    title: 'Abstract Design',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

                },
                {
                    background: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897591/Rectangle_2_cgevig.png',
                    title: 'Abstract Design',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    background: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897593/Rectangle_1_1_ndr86w.png',
                    title: 'Abstract Design',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    background: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897596/Rectangle_3_q4tav8.png',
                    title: 'Abstract Design',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    background: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897600/Rectangle_2_1_m3y8ax.png',
                    title: 'Abstract Design',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    background: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897280/Rectangle_13_korvpd.png',
                    title: 'Abstract Design',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
            ],
            services: [
                {
                    title: 'Graphic Design',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur ',
                    link: '',
                    price: 400,
                },
                {
                    title: 'Graphic Design',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur ',
                    link: '',
                    price: 400,
                },
                {
                    title: 'Graphic Design',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur ',
                    link: '',
                    price: 400,
                },
                {
                    title: 'Graphic Design',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur ',
                    link: '',
                    price: 400,
                },
            ],
            ourteam: [
                {
                    name: 'Jhon Doe',
                    avatar: 'https://res.cloudinary.com/openuniversity/image/upload/v1663919393/Rectangle_4_g6t6qa.png',
                    job: 'Digital Marketing Manager',
                },
                {
                    name: 'Jhon Doe',
                    avatar: 'https://res.cloudinary.com/openuniversity/image/upload/v1663919387/Rectangle_5_jlvzxh.png',
                    job: 'Digital Marketing Manager',
                },
                {
                    name: 'Jhon Doe',
                    avatar: 'https://res.cloudinary.com/openuniversity/image/upload/v1663919385/Rectangle_6_sk07z1.png',
                    job: 'Digital Marketing Manager',
                },
                {
                    name: 'Jhon Doe',
                    avatar: 'https://res.cloudinary.com/openuniversity/image/upload/v1663897289/Rectangle_7_sslvqe.png',
                    job: 'Digital Marketing Manager',
                }
            ],
            contact: [
                {
                    name: 'Twitter',
                    link: 'Twitter',
                },
                {
                    name: 'LinkedIn',
                    link: 'Twitter',
                },
                {
                    name: 'Dribbble',
                    link: 'Twitter',
                },
                {
                    name: 'YouTube',
                    link: 'Twitter',
                },
                {
                    name: 'Instagram',
                    link: 'Twitter',
                },
                {
                    name: 'Facebook',
                    link: 'Twitter',
                },
            ],
            footer:[
                {
                    name :'Privacy Policy',
                    link :'Privacy Policy',
                },
                {
                    name :'Privacy Policy',
                    link :'Privacy Policy',
                },
            ]
        },
    )
}
