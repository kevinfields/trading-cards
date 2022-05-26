export default async function ADD_WIN(userRef, cardRef, opponentCardId, rounds) {
  let xpValue = 2;

  switch (opponentCardId) {
    case "computerBeginner":
      xpValue = 1;
      break;
    case "computerNovice":
      break;
    case "computerProficient":
      xpValue = 3;
      break;
    case "computerExpert":
      xpValue = 4;
      break;
    case "computerMaster":
      xpValue = 5;
      break;
    default:
      break;
  }

  xpValue = xpValue * Math.ceil(rounds / 5);

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
