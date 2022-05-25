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

  const newBalance = Number(data.xpRemaining) - Number(totalCost);

  if (newBalance < 0) {
    alert("You don't have enough points!");
    return;
  }

  let cardData;
  await cardRef.get().then((doc) => {
    cardData = doc.data();
  });

  const newData = {
    health:
      health > 0 ? Number(cardData.health) + Number(health) : cardData.health,
    strength:
      strength > 0
        ? Number(cardData.strength) + Number(strength)
        : cardData.strength,
    accuracy:
      accuracy > 0
        ? Number(cardData.accuracy) + Number(accuracy)
        : cardData.accuracy,
    defense:
      defense > 0
        ? Number(cardData.defense) + Number(defense)
        : cardData.defense,
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
    xpRemaining: newBalance,
  });
}
