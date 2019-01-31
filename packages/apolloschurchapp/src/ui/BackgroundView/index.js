import LinearGradient from 'react-native-linear-gradient';
import { compose } from 'recompose';
import { styled, withTheme } from '@apollosproject/ui-kit';

const BackgroundView = compose(
  withTheme(({ theme, colors }) => ({
    colors: colors ||
      theme.overrides.background || [
        theme.colors.background.paper,
        theme.colors.background.screen,
      ],
  })),
  styled({ flex: 1 })
)(LinearGradient);

export default BackgroundView;
