// Design tokens — mirrors tailwind.config theme.extend.colors
// Already defined in the existing project; imported here for JS/TS usage
// (e.g. inline chart colors in Recharts, which cannot read Tailwind classes).
export const theme = {
  colors: {
    primary: '#2F6B5F',
    secondary: '#D9C7A3',
    accent: '#7A9E7E',
    background: '#F8F7F4',
    surface: '#FFFFFF',
    border: '#E7E2D8',
    heading: '#24332F',
    text: '#5E6B67',
  },
  radius: '14px',
};
