import { NoAvatar } from "@assets/image";
import { Button, Flex, Input } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";


type ImageProps = {
    handleChangeImage?: (e: ChangeEvent<HTMLInputElement>) => void
    multiple?: boolean
    image?: any
}

const ImageSelect = forwardRef<any, ImageProps>((props, ref) => {

    const { handleChangeImage, multiple = false, image } = props

    const [initImage, setInitImage] = useState(image)

    useEffect(() => {
        if (typeof image === 'object') {
            const reader = new FileReader();
            reader.onload = e => {
                setInitImage(e.target?.result)
            }
            reader.readAsDataURL(image);
        }
    }, [image])

    const renderImage = () => {
        if (typeof image === 'string') return `${process.env.API_URL_BE}/file/${image}`
        if (typeof initImage === 'string' && typeof image !== 'string' && initImage.length > 50) return initImage
    }

    return (
        <Flex className="items-center flex-col" onClick={() => ref.current.click()}>
            <Flex className="rounded-full overflow-hidden items-center justify-center" border={`1px solid ${mainColor.gray2} `} >
                <Image src={renderImage() || NoAvatar}
                    alt="avatar"
                    height={120}
                    width={120}
                />
            </Flex>
            <Button variant='outline' my={4}>Select image</Button>
            <Input variant='outline' my={4} type="file" multiple={multiple} hidden ref={ref} onChange={handleChangeImage} />
        </Flex>
    )
})

ImageSelect.displayName = 'ImageSelect'

export default ImageSelect

