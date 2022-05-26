export default async function ADD_BATTLE(
  battleRef,
  player1Id,
  card1Id,
  player2Id,
  card2Id,
  victor,
  rounds,
  date
) {
  await battleRef.add({
    challenged: player2Id,
    challenger: player1Id,
    challengedCard: card2Id,
    challengerCard: card1Id,
    victor: victor,
    rounds: rounds,
    timestamp: date,
  });
}
