export default async function ADD_WIN(userRef, cardRef, opponentCardId) {
  let xpValue = 10;

  switch (opponentCardId) {
    case "computerBeginner":
      xpValue = 5;
      break;
    case "computerNovice":
      break;
    case "computerProficient":
      xpValue = 15;
      break;
    case "computerExpert":
      xpValue = 20;
      break;
    case "computerMaster":
      xpValue = 25;
      break;
    default:
      break;
  }

  let data;
  await userRef
    .get()
    .then((doc) => {
      data = doc.data();
    })
    .then(() => {
      userRef.set({
        ...data,
        xpTotal: data.xpTotal + xpValue,
        xpRemaining: data.xpRemaining + xpValue,
        wins: data.wins + 1,
      });
    });

  let card;
  await cardRef
    .get()
    .then((doc) => {
      card = doc.data();
    })
    .then(() => {
      cardRef.set({
        ...card,
        victories: card.victories
          ? card.victories.concat(opponentCardId)
          : [opponentCardId],
        totalBattles: card.totalBattles ? card.totalBattles + 1 : 1,
      });
    });
}
