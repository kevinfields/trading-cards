export default async function ACCEPT_TRADE(tradeRef, twinRef, userRef, traderRef, myCardRef, traderCardRef) {

  let tradeData;
  await tradeRef.get().then(doc => {
    tradeData = {
      id: doc.id,
      data: doc.data()
    };
  });
  tradeRef.set({
    ...tradeData.data,
    accepted: true,
  });

  let twinData;
  await twinRef.get().then(doc => {
    twinData = {
      id: doc.id,
      data: doc.data(),
    };
  });
  twinRef.set({
    ...twinData.data,
    accepted: true,
  })

  let userData;
  await userRef.get().then(doc => {
    userData = {
      id: doc.id,
      data: doc.data(),
    };
  });

  let traderData;
  await traderRef.get().then(doc => {
    traderData = {
      id: doc.id,
      data: doc.data(),
    }
  });

  if (!traderData.data.cards.includes(tradeData.data.offeredCard)) {
    alert('This player no longer owns this card!');
    return;
  }

  if (!userData.data.cards.includes(tradeData.data.requestedCard)) {
    alert('You no longer own this card!');
    return;
  }

  let newCards = userData.data.cards.filter(cardId => cardId !== tradeData.data.requestedCard);
  newCards.push(tradeData.data.offeredCard);

  userRef.set({
    ...userData.data,
    cards: newCards,
  });

  
  let traderCards = traderData.data.cards.filter(cardId => cardId !== tradeData.data.offeredCard);
  traderCards.push(tradeData.data.requestedCard);
  traderRef.set({
    ...traderData.data,
    cards: traderCards,
  });

  let myCardData;

  await myCardRef.get().then(doc => {
    myCardData = {
      id: doc.id,
      data: doc.data(),
    }
  });

  let newOwnerList = [...myCardData.data.ownerList];
  newOwnerList.push(traderData.id);

  myCardRef.set({
    ...myCardData.data,
    ownerId: traderData.id,
    ownerList: newOwnerList,
  });

  let traderCardData;

  await traderCardRef.get().then(doc => {
    traderCardData = {
      id: doc.id,
      data: doc.data(),
    }
  });

  let newOwnerListTradedCard = [...traderCardData.data.ownerList];
  newOwnerListTradedCard.push(userData.id);

  traderCardRef.set({
    ...traderCardData.data,
    ownerId: userData.id,
    ownerList: newOwnerListTradedCard,
  });

}