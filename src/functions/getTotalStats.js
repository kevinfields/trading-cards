export default function getTotalStats(obj) {
  
  return Number(obj.health) + Number(obj.strength) + Number(obj.defense) + Number(obj.accuracy);
}