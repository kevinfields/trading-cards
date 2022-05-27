export default async function DECLINE_TRADE(tradeRef, twinRef) {
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
}