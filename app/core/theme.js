import { maxAppWidth } from './size'

export const theme = {
  colors: {
    surface: '#132137',
    primary: '#213A62',
    secondary: '#F69842',
    third: '#F3C245',
    error: '#f13a59',
    buttonBorder: '#D5D5D5',
  },

  container: {
    flex: 1,
    width: "100%",
  },

  flex: {
    flex: 1,
  },

  hCenter: {
    alignItems: 'center',
  },

  vCenter: {
    justifyContent: 'center',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  maxWidth: {
    width: maxAppWidth,
  }
};
