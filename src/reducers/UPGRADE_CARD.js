export default async function UPGRADE_CARD(
  cardRef,
  userRef,
  health,
  strength,
  accuracy,
  defense
) {
  let totalCost =
    Number(health) + Number(strength) + Number(accuracy) + Number(defense);

  let data;
  await userRef.get().then((doc) => {
    data = doc.data();
  });

  const newBalance = data.remainingXp - totalCost;

  if (newBalance < 0) {
    alert("You don't have enough points!");
    return;
  }

  let cardData;
  await cardRef.get().then((doc) => {
    cardData = doc.data();
  });

  const newData = {
    health: cardData.health + health,
    strength: cardData.strength + strength,
    accuracy: cardData.accuracy + accuracy,
    defense: cardData.defense + defense,
  };

  await cardRef.set({
    ...cardData,
    health: newData.health,
    strength: newData.strength,
    accuracy: newData.accuracy,
    defense: newData.defense,
  });
  await userRef.set({
    ...data,
    remainingXp: newBalance,
  });
}
