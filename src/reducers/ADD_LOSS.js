export default async function ADD_LOSS(userRef, cardRef, opponentCardId) {
  
  let data;
  await userRef
    .get()
    .then((doc) => {
      data = doc.data();
    })
    .then(() => {
      userRef.set({
        ...data,
        xpTotal: data.xpTotal + 1,
        xpRemaining: data.xpRemaining + 1,
        losses: data.losses + 1,
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
        defeats: card.defeats
          ? card.defeats.concat(opponentCardId)
          : [opponentCardId],
        totalBattles: card.totalBattles ? card.totalBattles + 1 : 1,
      });
    });
}
