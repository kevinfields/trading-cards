export default async function MAKE_TRADE_REQUEST(userRef, requesteeRef, cardOfferId, cardRequestId, date) {
  
  let userData;
  await userRef.get().then((doc) => {
    userData = {
      data: doc.data(),
      id: doc.id,
    };
  });

  let requesteeData;
  await requesteeRef.get().then(doc => {
    requesteeData = {
      data: doc.data(),
      id: doc.id,
    }
  });

  let dataObject = {
    accepted: false,
    declined: false,
    offeredCard: cardOfferId,
    offeror: true,
    requestDate: date,
    requestedCard: cardRequestId,
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
      offeror: false,
      requestDate: date,
      requestedCard: cardRequestId,
      tradingWith: userData.id,
      tradingWithName: userData.data.name,
      userName: requesteeData.data.name,
      userId: requesteeData.id,
      twinDoc: doc.id,
    }).then((secondDoc) => {
      userRef.collection('trade-offers').doc(doc.id).set({
        ...dataObject,
        twinDoc: secondDoc.id,
      });
    })
  })
}