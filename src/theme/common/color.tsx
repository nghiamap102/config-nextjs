import { Global } from '@emotion/react'

const common = {
  blue: '##4267B2',
  black: '#222731'
}

export const mainColor = {
  orange: '#fd6506',
  white: '#ffff',
  gray: '#f5f5f5',
  gray1:'#505050',
  black: '#000000',
  boxshadow: '#0000000d',
  newTag: '#06BFE2',
  hotTag: '#FFBB49',
  saleTag: '#EF6454',
  yellow: '#f7b733',
  red: '#e10600',
  red2: '#ffd8d7',
  blueDark: '#4267B2',
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
    }
      `}
  />
)

export default Color
