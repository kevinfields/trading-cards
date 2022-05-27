export default function getCardLevel(levels) {
  
  if (levels >= 375) {
    return 'Grandmaster';
  }
  if (levels >= 250) {
    return 'Expert';
  }
  if (levels >= 200) {
    return 'Proficient';
  }
  if (levels >= 150) {
    return 'Novice';
  }
  return 'Beginner';
}