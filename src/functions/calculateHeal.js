//returns the final health value after healing, not the value of healing itself.

//CHART:
//  Current   Max   HealingValue    FinalValue
//  1         100   25              26
//  50        75    6               56
//  25        85    15              40
//  10        15    1               11
//  100       100   0               100
//  50        50    0               50



export default function calculateHeal(current, max) {

  current = Number(current);
  max = Number(max);

  const missing = max - current;
  const quarter = Math.floor(missing / 4);
  
  return current + quarter;

}