import { Global } from '@emotion/react'

const common = {
  blue: '#012CDB',
  black: '#222731'
}

export const mainColor = {
  primary: common.blue,
  orange: '#fd6506',
  white: '#ffff',
  gray: '#f5f5f5',
  black: '#000000',
  boxshadow: '#0000000d',
  newTag: '#06BFE2',
  hotTag: '#FFBB49',
  saleTag: '#EF6454',
}

const Color = () => (
  <Global
    styles={`
    :root {
      --orange: ${mainColor.orange};
      --white: ${mainColor.white};
      --black: ${mainColor.black};
      --gray: ${mainColor.gray};
      --boxshadow: ${mainColor.boxshadow};
      --new-tag: ${mainColor.newTag};
      --hot-tag: ${mainColor.hotTag};
      --sale-tag: ${mainColor.saleTag};
    }
      `}
  />
)

export default Color
