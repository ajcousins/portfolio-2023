import { distort_path } from '../references/transform';

export const scaleTranslate = (
  input: number,
  scaleInput: Scale,
  scaleOutput: Scale
): number => {
  if (input <= scaleInput.min) return scaleOutput.min;
  if (input >= scaleInput.max) return scaleOutput.max;
  return (
    scaleOutput.min +
    ((input - scaleInput.min) / (scaleInput.max - scaleInput.min)) *
      (scaleOutput.max - scaleOutput.min)
  );
};

export const shadowPoints = (
  textObj: SVGSVGElement,
  origin: Coord,
  originalBounds: Coord[]
): string => {
  const bounds = textObj.getBoundingClientRect();
  const elevation = origin.y / window.innerHeight;
  const shadowHeight = scaleTranslate(
    elevation,
    { min: 0, max: 0.6 },
    { min: 20, max: 300 }
  );

  const ha = bounds.bottom - origin.y;
  const hb = ha + shadowHeight;
  const wa1 = origin.x - bounds.right;
  const wb1 = (hb * wa1) / ha;
  const wa2 = origin.x - bounds.left;
  const wb2 = (hb * wa2) / ha;

  const destPoints = [
    [bounds.left, bounds.bottom],
    [origin.x - wb2, origin.y + hb],
    [origin.x - wb1, origin.y + hb],
    [bounds.right, bounds.bottom],
  ] as [number, number][];

  const destPointsFmt = destPoints.map((coord) => {
    return { x: coord[0], y: coord[1] };
  });

  const originalPath =
    (textObj.children[0] as SVGElement).getAttribute('d') ?? '';

  return distort_path(originalPath, originalBounds, destPointsFmt);
};

export const referencePoints = (
  obj: Coord,
  origin: Coord,
  baseline: number
): Coord => {
  const ha = obj.y - origin.y;
  const hb = baseline - origin.y;
  const wa = obj.x < origin.x ? origin.x - obj.x : obj.x - origin.x;
  const wb = (wa * hb) / ha;
  const pointX = obj.x < origin.x ? origin.x - wb : origin.x + wb;
  return { x: pointX, y: baseline };
};

export const newPointFromReference = (
  obj: Coord,
  refPoint: Coord,
  origin: Coord
): Coord => {
  const ha = obj.y - origin.y;
  const hb = refPoint.y - origin.y;
  const wb =
    refPoint.x < origin.x ? origin.x - refPoint.x : refPoint.x - origin.x;
  const wa = (wb * ha) / hb;
  const pointX = refPoint.x < origin.x ? origin.x - wa : origin.x + wa;
  return { x: pointX, y: obj.y };
};

export const getTextScale = (
  originalBounds: Coord[],
  windowHeight: number,
  targetHeightPercentage: number,
): number => {
  const originalHeightPercentage = originalBounds[1].x / windowHeight;
  return targetHeightPercentage / originalHeightPercentage;
};

export const numToHex = (value: number): string => {
  const hex = Math.floor(
    scaleTranslate(
      value,
      { min: 0, max: 1 },
      { min: 0, max: 255 }
    )
  ).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}