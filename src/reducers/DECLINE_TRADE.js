export default async function DECLINE_TRADE(tradeRef, twinRef, alertRef, time) {
  let tradeData;
  await tradeRef.get().then(doc => {
    tradeData = {
      id: doc.id,
      data: doc.data(),
    }
  });

  tradeRef.set({
    ...tradeData.data,
    declined: true,
  });

  let twinData;
  await twinRef.get().then(doc => {
    twinData = {
      id: doc.id,
      data: doc.data(),
    }
  });

  twinRef.set({
    ...twinData.data,
    declined: true,
  })

  alertRef.add({
    timestamp: time,
    message: `Sorry, ${tradeData.data.userName} has declined your trade offer for their card ${tradeData.data.requestedCardName ? tradeData.data.requestedCardName : tradeData.data.requestedCard}.`,
    read: false,
    type: 'declined trade',
  });
}