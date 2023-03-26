import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Heading Font Name';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Rubik-Bold.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Body Font Name';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/DMSans-Regular.ttf');
      }
      
      /* latin */
      @font-face {
        font-family: 'DMSans';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/DMSans-Medium.ttf');
      }
      
      /* latin */
      @font-face {
        font-family: 'DMSans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/DMSans-Bold.ttf');
      }
      `}
  />
)

export default Fonts
