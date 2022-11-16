import { mainColor } from "@theme/theme";

const renderColor = (tag: 'new' | 'hot' | 'sale' | undefined) => {
    switch (tag) {
        case 'new':
            return mainColor.newTag
        case 'hot':
            return mainColor.hotTag
        case 'sale':
            return mainColor.saleTag
        default:
            return null;
    }
}




export {
    renderColor,
}
