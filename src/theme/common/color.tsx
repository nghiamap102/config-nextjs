import { Global } from '@emotion/react'

export const mainColor = {
    black: '#000000',
    lightBlack: 'rgba(0,0,0,.09)',
    blueDark: '#4267B2',
    boxshadow: '#0000000d',
    orange: '#fd6506',
    orange2: '#fa886c',
    gray: '#f5f5f5',
    gray1: '#505050',
    gray2: '#bbb',
    gray3: '#757575',
    hotTag: '#FFBB49',
    newTag: '#06BFE2',
    red: '#e10600',
    red2: '#ffd8d7',
    red3: '#fc4f26',
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
      --orange2: ${mainColor.orange2};
      --white: ${mainColor.white};
      --black: ${mainColor.black};
      --light-black: ${mainColor.lightBlack};
      --gray: ${mainColor.gray};
      --gray1: ${mainColor.gray1};
      --gray2: ${mainColor.gray2};
      --gray3: ${mainColor.gray3};
      --yellow: ${mainColor.yellow};
      --boxshadow: ${mainColor.boxshadow};
      --new-tag: ${mainColor.newTag};
      --hot-tag: ${mainColor.hotTag};
      --sale-tag: ${mainColor.saleTag};
      --red: ${mainColor.red};
      --red2: ${mainColor.red2};
      --red3: ${mainColor.red3};
      --blueDark: ${mainColor.blueDark};
      --skin: ${mainColor.skin};
    }
      `}
    />
)

export default Color
