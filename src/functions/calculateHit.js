
//calculate the range based on the params, then create an array of possibile options.
//the high and low end of the range should have one chance, and the numbers between
//should have 2. The number or numbers in the middle should have three, unless the range only
//spans five or less numbers.
//a range of 0-10 should have 
// [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10]


// the Math.floor(aS / 3) value is there so players with high strength can still hit
// against high defense. This significantly increases the hit value range, so instead
// of 100 strength vs 100 defense having a range of 0-2, it is now 0-12 (2 + Math.floor(100/10)) 




export default function calculateHit(aS, aA, dD, dA) {

  const baseHit = Math.floor(Number(aS) * (Number(aA) / 100));
  const baseDefense = Math.floor(Number(dD) * (Number(dA) / 100));
  
  let range = [0, ((baseHit - baseDefense) + Math.floor(aS / 10))];
  let rangeCount = range[1];
  
  if (rangeCount <= 0) {
    range = [0, 2];
    rangeCount = 2;
  }

  let middles = [];

  const lowerMiddle = Math.floor(rangeCount / 2);
  const upperMiddle = Math.ceil(rangeCount / 2);

  if (lowerMiddle === upperMiddle) {
    middles.push(lowerMiddle);
  } else {
    middles.push(lowerMiddle);
    middles.push(upperMiddle);
  }

  
  let vals = [0];

  if (rangeCount < 5) {
    for (let i=1; i<rangeCount; i++) {
      if (middles.includes(i)) {
        vals.push(i);
        vals.push(i);
      } else {
        vals.push(i);
      }
    }
    vals.push(rangeCount);
  } else {
    for (let i=1; i<rangeCount; i++) {
      if (middles.includes(i)) {
        vals.push(i);
        vals.push(i);
        vals.push(i);
        if (middles.length === 1) {
          vals.push(i - 1);
          vals.push(i + 1);
        }
      } else {
        vals.push(i);
        vals.push(i);
      }
    }
    vals.push(rangeCount);
  }

  if (vals[0] === 0 && vals[1] === 1 && vals.length === 2) {
    vals = [0, 1, 1, 2];
  }

  const hit = Math.floor(Math.random() * vals.length);


  return vals[hit];
}
