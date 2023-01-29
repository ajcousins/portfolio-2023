function transferPoint(xI: number, yI: number, src: Coord[], dest: Coord[]): Coord {
  const BUFFER = 0.001;

  const xA = src[0].x;
  const yA = src[0].y;

  const xC = src[2].x;
  const yC = src[2].y;

  let xAu = dest[0].x;
  let yAu = dest[0].y;

  let xBu = dest[1].x;
  let yBu = dest[1].y;

  let xCu = dest[2].x;
  let yCu = dest[2].y;

  let xDu = dest[3].x;
  let yDu = dest[3].y;

  if (xBu == xCu) xCu += BUFFER;
  if (xAu == xDu) xDu += BUFFER;
  if (xAu == xBu) xBu += BUFFER;
  if (xDu == xCu) xCu += BUFFER;
  let kBC = (yBu - yCu) / (xBu - xCu);
  let kAD = (yAu - yDu) / (xAu - xDu);
  let kAB = (yAu - yBu) / (xAu - xBu);
  let kDC = (yDu - yCu) / (xDu - xCu);

  if (kBC == kAD) kAD += BUFFER;
  const xE = (kBC * xBu - kAD * xAu + yAu - yBu) / (kBC - kAD);
  const yE = kBC * (xE - xBu) + yBu;

  if (kAB == kDC) kDC += BUFFER;
  let xF = (kAB * xBu - kDC * xCu + yCu - yBu) / (kAB - kDC);
  let yF = kAB * (xF - xBu) + yBu;

  if (xE == xF) xF += BUFFER;
  let kEF = (yE - yF) / (xE - xF);

  if (kEF == kAB) kAB += BUFFER;
  let xG = (kEF * xDu - kAB * xAu + yAu - yDu) / (kEF - kAB);
  let yG = kEF * (xG - xDu) + yDu;

  if (kEF == kBC) kBC += BUFFER;
  let xH = (kEF * xDu - kBC * xBu + yBu - yDu) / (kEF - kBC);
  let yH = kEF * (xH - xDu) + yDu;

  let rG = (yC - yI) / (yC - yA);
  let rH = (xI - xA) / (xC - xA);

  let xJ = (xG - xDu) * rG + xDu;
  let yJ = (yG - yDu) * rG + yDu;

  let xK = (xH - xDu) * rH + xDu;
  let yK = (yH - yDu) * rH + yDu;

  if (xF == xJ) xJ += BUFFER;
  if (xE == xK) xK += BUFFER;
  let kJF = (yF - yJ) / (xF - xJ);
  let kKE = (yE - yK) / (xE - xK);

  if (kJF == kKE) kKE += BUFFER;
  const xIu = (kJF * xF - kKE * xE + yE - yF) / (kJF - kKE);
  const yIu = kJF * (xIu - xJ) + yJ;

  return { x: Math.round(xIu), y: Math.round(yIu) };
}

function path_string_to_array(path_str: string): (string | number)[] {
  const patt1 = /[mzlhvcsqta]|-?[0-9.]+/gi;
  const path_arr = path_str.match(patt1);
  const patt2 = /[mzlhvcsqta]/i;
  if (!path_arr) return [];
  return path_arr.map((cmd) => (!cmd.match(patt2) ? parseFloat(cmd) : cmd));
}

export function distort_path(path_str: string, source: Coord[], destination: Coord[]) {
  const path_arr = path_string_to_array(path_str);

  let subpath_type: string = '';
  let is_num: boolean;
  let xy_counter = 0;
  let isX = false;
  const pointHistory: Coord[] = [];
  const transformedPathArr = [];

  for (let i = 0; i < path_arr.length; i++) {
    let curr = path_arr[i];
    if (typeof curr === 'string') {
      xy_counter = -1;
      subpath_type = curr.toString();
      is_num = false;
      if (curr !== 'H' && curr !== 'V') {
        transformedPathArr.push(curr);
      }
    } else {
      is_num = true;
    }
    xy_counter % 2 === 0 ? (isX = true) : (isX = false);

    if (!is_num) {
      xy_counter++;
      continue;
    }

    let x: number = 0;
    let y: number = 0;

    if (subpath_type === 'V') {
      transformedPathArr.push('L');
      x = pointHistory[pointHistory.length - 1].x;
      y = Number(curr);
    }

    if (subpath_type === 'H') {
      transformedPathArr.push('L');
      x = Number(curr);
      y = pointHistory[pointHistory.length - 1].y;
    }

    if (!isX) {
      const prev = path_arr[i - 1];
      x = typeof prev === 'string' ? parseFloat(prev) : prev;
      y = Number(curr);
    }

    if (subpath_type === 'V' || subpath_type === 'H' || !isX) {
      pointHistory.push({ x, y });
      const newPoint = transferPoint(x, y, source, destination);
      transformedPathArr.push(newPoint.x);
      transformedPathArr.push(newPoint.y);
    }

    xy_counter++;
  }

  return transformedPathArr.join(' ');
}
