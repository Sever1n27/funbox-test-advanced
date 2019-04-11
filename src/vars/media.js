const size = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  xl: 1200
};
const media = Object.keys(size).reduce((acc, cur) => {
  acc[cur] = `(min-width: ${size[cur]}px)`;
  return acc;
}, {});
export default media;
