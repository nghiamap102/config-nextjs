import { Global } from '@emotion/react'

export const mainColor = {
    black: '#000000',
    lightBlack: 'rgba(0,0,0,.09)',
    blueDark: '#4267B2',
    boxshadow: '#0000000d',
    orange: '#fd6506',
    gray: '#757575',
    hotTag: '#FFBB49',
    newTag: '#06BFE2',
    red: '#e10600',
    skin: '#fbf1f1',
    saleTag: '#EF6454',
    white: '#ffff',
    yellow: '#f7b733',
}

const Color = () => (
    <Global
        styles={`
    :root {
      --orange: ${mainColor.orange};
      --white: ${mainColor.white};
      --black: ${mainColor.black};
      --light-black: ${mainColor.lightBlack};
      --gray: ${mainColor.gray};
      --yellow: ${mainColor.yellow};
      --boxshadow: ${mainColor.boxshadow};
      --new-tag: ${mainColor.newTag};
      --hot-tag: ${mainColor.hotTag};
      --sale-tag: ${mainColor.saleTag};
      --red: ${mainColor.red};
      --blueDark: ${mainColor.blueDark};
      --skin: ${mainColor.skin};
    }
      `}
    />
)

export default Color
