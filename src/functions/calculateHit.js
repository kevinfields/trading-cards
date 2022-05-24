export default function calculateHit(aS, aA, dD, dA) {
  let baseHit = Math.floor(Number(aS) * (Number(aA) / 100));
  let baseDefense = Math.floor(Number(dD) * (Number(dA) / 100)) / 2;
  let hitBonus = Math.floor(Math.random() * 10) + baseHit;
  let defenseBonus = Math.floor(Math.random() * 10) + baseDefense;

  return Math.floor(hitBonus - defenseBonus);
}
