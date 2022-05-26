export default async function MAKE_CARD(cardObject, userRef, cardsRef, cost) {

  let id;
  await cardsRef.add(cardObject).then((doc) => {
    id = doc.id;
  });
  let data;
  await userRef
    .get()
    .then((doc) => {
      data = doc.data();
    })
    .then(() => {
      userRef.set({
        ...data,
        cards: data.cards.concat(id),
        xpRemaining: data.xpRemaining - (cost > 100 ? cost - 100 : 0),
      });
    });
}
