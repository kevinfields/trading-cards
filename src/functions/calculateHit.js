export default function calculateHit(aS, aA, dD, dA) {
  const baseHit = Math.floor(Number(aS) * (Number(aA) / 100));
  const baseDefense = Math.floor(Number(dD) * (Number(dA) / 100));
  let totalBaseHit = baseHit - baseDefense;
  if (totalBaseHit < 0) {
    totalBaseHit = 0;
  }
  const hitBonus = Math.floor(Math.random() * baseHit);
  const defenseBonus = Math.floor(Math.random() * baseDefense);
  let totalBonus = hitBonus - defenseBonus;
  if (totalBonus < 0) {
    totalBonus = 0;
  }

  return totalBaseHit + totalBonus;
}
