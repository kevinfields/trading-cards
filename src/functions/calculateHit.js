export default function calculateHit(aS, aA, dD, dA) {
  console.table([aS, aA, dD, dA]);

  const baseHit = Math.floor(Number(aS) * (Number(aA) / 100));
  const baseDefense = Math.floor(Number(dD) * (Number(dA) / 100));
  console.log("baseHit: " + baseHit);
  console.log("baseDefense: " + baseDefense);

  let totalBaseHit = baseHit - baseDefense;
  console.log("totalBaseHit: " + totalBaseHit);
  if (totalBaseHit < 0) {
    totalBaseHit = 0;
  }
  const hitBonus = Math.floor(Math.random() * baseHit);
  console.log("hitBonus: " + hitBonus);
  const defenseBonus = Math.floor(Math.random() * baseDefense);
  console.log("defenseBonus: " + defenseBonus);

  let totalBonus = hitBonus - defenseBonus;
  console.log("totalBonus: " + totalBonus);
  if (totalBonus < 0) {
    totalBonus = 0;
  }

  return totalBaseHit + totalBonus;
}
