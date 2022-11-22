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
        src: url('fonts/Rubik-SemiBold.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'DMSans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('fonts/DMSans-Bold.ttf');
      }
      @font-face {
        font-family: 'DMSans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('fonts/DMSans-Medium.ttf');
      }
      @font-face {
        font-family: 'DMSans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('fonts/DMSans-Regular.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('fonts/Rubik-Regular.ttf');
      }
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('fonts/Rubik-Medium.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('fonts/Rubik-SemiBold.ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('fonts/Rubik-Bold.ttf');
      }
      `}
  />
)

export default Fonts
