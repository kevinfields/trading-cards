import getTotalStats from "../functions/getTotalStats";

export default async function MAKE_TRADE_REQUEST(userRef, requesteeRef, cardOfferId, cardRequestId, date, cardsRef) {
  
  let requestedCard = {
    name: '',
    statTotal: '',
  };

  let offeredCard = {
    name: '',
    statTotal: '',
  };

  let userData;
  await userRef.get().then((doc) => {
    userData = {
      data: doc.data(),
      id: doc.id,
    };
  });

  if (!userData.data.cards.includes(cardOfferId)) {
    alert('You do not own this card!');
    return;
  }

  let requesteeData;
  await requesteeRef.get().then(doc => {
    requesteeData = {
      data: doc.data(),
      id: doc.id,
    }
  });

  if (!requesteeData.data.cards.includes(cardRequestId)) {
    alert('The card you are requesting is not owned by this player!');
    return;
  }

  await cardsRef.doc(cardRequestId).get().then(doc => {
    requestedCard = {
      name: doc.data().name,
      totalStats: getTotalStats(doc.data()),
    }
  });

  await cardsRef.doc(cardOfferId).get().then(doc => {
    offeredCard = {
      name: doc.data().name,
      totalStats: getTotalStats(doc.data()),
    }
  })

  let dataObject = {
    accepted: false,
    declined: false,
    offeredCard: cardOfferId,
    offeredCardName: offeredCard.name,
    offeredCardStats: Number(offeredCard.totalStats),
    offeror: true,
    requestDate: date,
    requestedCard: cardRequestId,
    requestedCardName: requestedCard.name,
    requestedCardStats: Number(requestedCard.totalStats),
    tradingWith: requesteeData.id, 
    tradingWithName: requesteeData.data.name,
    userName: userData.data.name,
    userId: userData.id,
    twinDoc: '',
  };

  userRef.collection('trade-offers').add(dataObject).then((doc) => {
    requesteeRef.collection('trade-offers').add({
      accepted: false,
      declined: false,
      offeredCard: cardOfferId,
      offeredCardName: offeredCard.name,
      offeredCardStats: Number(offeredCard.totalStats),
      offeror: false,
      requestDate: date,
      requestedCard: cardRequestId,
      requestedCardName: requestedCard.name,
      requestedCardStats: Number(requestedCard.totalStats),
      tradingWith: userData.id,
      tradingWithName: userData.data.name,
      userName: requesteeData.data.name,
      userId: requesteeData.id,
      twinDoc: doc.id,
    }).then((secondDoc) => {
      userRef.collection('trade-offers').doc(doc.id).set({
        ...dataObject,
        twinDoc: secondDoc.id,
      }).then(() => {
        requesteeRef.collection('alerts').add({
          message: `You have a new trade request! ${userData.data.name} wants to trade for your card ${requestedCard.name}.`,
          timestamp: date,
          read: false,
          type: 'trade request',
          requestId: secondDoc.id,
        });
      });
    });
  });

  
}