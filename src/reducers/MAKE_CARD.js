export default async function MAKE_CARD(cardObject, userRef, cardsRef) {
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
      });
    });
}
