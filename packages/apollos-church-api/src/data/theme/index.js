import { gql } from 'apollo-server';
import randomColor from 'randomcolor';

import colorScalarType from './colorScalarType';

export const schema = gql`
  type Theme {
    type: ThemeType
    colors: ThemeColors
  }

  enum ThemeType {
    LIGHT
    DARK
  }

  scalar Color

  type ThemeColors {
    primary: Color
    secondary: Color
    screen: Color
    paper: Color
    alert: Color
  }
`;

export const resolver = {
  Theme: {
    type: ({ type }) => type || 'DARK', // todo: infer theme type from data
    colors: ({ colors, seed = Math.random() }) => {
      if (colors) {
        return colors;
      }
      //   const seed = colors
      //   // todo: don't generate a random theme :)
      //   const baseColors = randomColor({ seed, count: 2, luminosity: 'bright' });
      //   return {
      //     primary: baseColors[0],
      //     secondary: baseColors[1],
      //     screen: randomColor({
      //       seed,
      //       hue: baseColors[0],
      //       luminosity: 'dark',
      //     }),
      //     paper: randomColor({
      //       seed,
      //       hue: baseColors[1],
      //       luminosity: 'dark',
      //     }),
      //     alert: randomColor({
      //       seed,
      //       hue: 'red',
      //     }),
      //   };
      // },
    },
  },
  Color: colorScalarType,
};

export class model {} // todo
