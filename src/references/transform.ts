export function transferPoint(
  xI: number,
  yI: number,
  source: Coord[],
  destination: Coord[]
): Coord {
  var ADDING = 0.001; // to avoid dividing by zero

  var xA = source[0].x;
  var yA = source[0].y;

  var xC = source[2].x;
  var yC = source[2].y;

  var xAu = destination[0].x;
  var yAu = destination[0].y;

  var xBu = destination[1].x;
  var yBu = destination[1].y;

  var xCu = destination[2].x;
  var yCu = destination[2].y;

  var xDu = destination[3].x;
  var yDu = destination[3].y;

  // Calcultations
  // if points are the same, have to add a ADDING to avoid dividing by zero
  if (xBu == xCu) xCu += ADDING;
  if (xAu == xDu) xDu += ADDING;
  if (xAu == xBu) xBu += ADDING;
  if (xDu == xCu) xCu += ADDING;
  var kBC = (yBu - yCu) / (xBu - xCu);
  var kAD = (yAu - yDu) / (xAu - xDu);
  var kAB = (yAu - yBu) / (xAu - xBu);
  var kDC = (yDu - yCu) / (xDu - xCu);

  if (kBC == kAD) kAD += ADDING;
  var xE = (kBC * xBu - kAD * xAu + yAu - yBu) / (kBC - kAD);
  var yE = kBC * (xE - xBu) + yBu;

  if (kAB == kDC) kDC += ADDING;
  var xF = (kAB * xBu - kDC * xCu + yCu - yBu) / (kAB - kDC);
  var yF = kAB * (xF - xBu) + yBu;

  if (xE == xF) xF += ADDING;
  var kEF = (yE - yF) / (xE - xF);

  if (kEF == kAB) kAB += ADDING;
  var xG = (kEF * xDu - kAB * xAu + yAu - yDu) / (kEF - kAB);
  var yG = kEF * (xG - xDu) + yDu;

  if (kEF == kBC) kBC += ADDING;
  var xH = (kEF * xDu - kBC * xBu + yBu - yDu) / (kEF - kBC);
  var yH = kEF * (xH - xDu) + yDu;

  var rG = (yC - yI) / (yC - yA);
  var rH = (xI - xA) / (xC - xA);

  var xJ = (xG - xDu) * rG + xDu;
  var yJ = (yG - yDu) * rG + yDu;

  var xK = (xH - xDu) * rH + xDu;
  var yK = (yH - yDu) * rH + yDu;

  if (xF == xJ) xJ += ADDING;
  if (xE == xK) xK += ADDING;
  var kJF = (yF - yJ) / (xF - xJ); //23
  var kKE = (yE - yK) / (xE - xK); //12

  if (kJF == kKE) kKE += ADDING;
  var xIu = (kJF * xF - kKE * xE + yE - yF) / (kJF - kKE);
  var yIu = kJF * (xIu - xJ) + yJ;

  var b = { x: xIu, y: yIu };
  b.x = Math.round(b.x);
  b.y = Math.round(b.y);
  return b;
}


// Function splits path string to coordinates array
function path_string_to_array(path_str: string): (string | number)[] {
  const patt1 = /[mzlhvcsqta]|-?[0-9.]+/gi;
  const path_arr = path_str.match(patt1);
  const patt2 = /[mzlhvcsqta]/i;
  if (!path_arr) return [];
  return path_arr.map((cmd) => (!cmd.match(patt2) ? parseFloat(cmd) : cmd));
}


// Function distorts path_str from source coordinates
// to destination coordinates
export function distort_path(
  path_str: string,
  source: Coord[],
  destination: Coord[]
) {
  var path_arr = path_string_to_array(path_str);

  let subpath_type: (number | string) = '';
  let is_num: boolean;
  let xy_counter = 0;
  let isX = false;
  const  path_arr2 = [];
  var subpath_type_upper;
  var point;
  const pointHistory = [];

  for (var i = 0; i < path_arr.length; i++) {
    var patt1 = /[mzlhvcsqta]/i;
    var curr = path_arr[i];
    if (curr.toString().match(patt1)) {
      // if current char is a valid letter
      xy_counter = -1;
      subpath_type = curr;
      subpath_type_upper = subpath_type.toString().toUpperCase();
      is_num = false;
      if (curr !== 'H' && curr !== 'V') {
        path_arr2.push(curr);
      }
    } // current char is a number
    else {
      // console.log("should be number:", curr);
      is_num = true;
      curr = parseFloat(curr);
    }
    if (xy_counter % 2 === 0) isX = true;
    else isX = false;

    if (!is_num) {
      xy_counter++;
      continue;
    }


    if (subpath_type === 'V') {
      path_arr2.push('L');
      const x = pointHistory[pointHistory.length - 1].x;
      const y = curr;
      pointHistory.push({ x, y });

      point = transferPoint(x, y, source, destination);
      path_arr2.push(point.x);
      path_arr2.push(point.y);
      // console.log("point:", point);
    } else if (subpath_type === 'H') {
      path_arr2.push('L');
      const x = curr;
      const y = pointHistory[pointHistory.length - 1].y;
      pointHistory.push({ x, y });

      point = transferPoint(x, y, source, destination);
      path_arr2.push(point.x);
      path_arr2.push(point.y);
      // console.log("point:", point);
    } else if (!isX) {
      const x = parseFloat(path_arr[i - 1]);
      const y = curr;
      pointHistory.push({ x, y });

      point = transferPoint(x, y, source, destination);
      path_arr2.push(point.x);
      path_arr2.push(point.y);
      // console.log("point:", point);
    }
    
    xy_counter++;
  }

  return path_arr2.join(" ");
}
