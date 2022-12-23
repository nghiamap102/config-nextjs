import { Global } from '@emotion/react'

export const mainColor = {
  black: '#000000',
  blueDark: '#4267B2',
  boxshadow: '#0000000d',
  orange: '#fd6506',
  gray: '#f5f5f5',
  gray1:'#505050',
  hotTag: '#FFBB49',
  newTag: '#06BFE2',
  red: '#e10600',
  red2: '#ffd8d7',
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
      --gray: ${mainColor.gray};
      --gray1: ${mainColor.gray1};
      --yellow: ${mainColor.yellow};
      --boxshadow: ${mainColor.boxshadow};
      --new-tag: ${mainColor.newTag};
      --hot-tag: ${mainColor.hotTag};
      --sale-tag: ${mainColor.saleTag};
      --red: ${mainColor.red};
      --red2: ${mainColor.red2};
      --blueDark: ${mainColor.blueDark};
      --skin: ${mainColor.skin};
    }
      `}
  />
)

export default Color
