import getTotalStats from "../functions/getTotalStats";
import ADD_BADGE from "./ADD_BADGE";

export default async function UPGRADE_CARD(
  cardRef,
  userRef,
  health,
  strength,
  accuracy,
  defense,
  badgesRef,
) {
  let totalCost =
    Number(health) + Number(strength) + Number(accuracy) + Number(defense);

  let data;
  await userRef.get().then((doc) => {
    data = doc.data();
  });

  const newBalance = Number(data.xpRemaining) - Number(totalCost);

  if (newBalance < 0) {
    return false;
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
    upgrades: cardData.upgrades ? Number(cardData.upgrades) + 1 : 1,
  });
  await userRef.set({
    ...data,
    xpRemaining: newBalance,
  });

  if (getTotalStats(newData) === 400 && cardData.ownerList.length === 1) {

    const timestamp = new Date();
    ADD_BADGE(badgesRef, userRef, {
      title: 'Trainer',
      description: 'Upgrade a card that has only been owned by you to total level 400.',
      rank: 3,
      idTag: 'trainer',
      firstEarned: timestamp,
    });
  }
  return true;
}
