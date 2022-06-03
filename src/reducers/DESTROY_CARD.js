export default async function DESTROY_CARD(cardRef, userRef) {

  let cardData;
  let userData;
  let cardId;

  await cardRef.get().then(doc => {
    cardData = doc.data();
    cardId = doc.id;
  });

  await userRef.get().then(doc => {
    userData = doc.data();
  });

  userRef.set({
    ...userData,
    cards: userData.cards.filter(card => card !== cardId),
  });

  cardRef.set({
    ...cardData,
    destroyed: true,
  });
}