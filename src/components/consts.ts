export const menuObjects: MenuObj[] = [
  {
    text: 'PORTFOLIO',
    textHeight: 50,
    xCentre: 300, // percent
    yBottom: 450,
  },
  {
    text: 'ABOUT',
    textHeight: 20,
    xCentre: 400, // percent
    yBottom: 250,
  },
  {
    text: 'CONTACT',
    textHeight: 20,
    xCentre: 500, // percent
    yBottom: 200,
  },
];

export const getTextStyle = (textHeight: number): string => `
  font: bold ${textHeight}px Helvetica, Arial, sans-serif;
`
