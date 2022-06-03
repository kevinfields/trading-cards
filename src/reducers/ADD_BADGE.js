/*
  BADGE OBJECT PROPS:
    title: string
    description: string
    idTag: string
    firstEarned: timestamp,
    rank: number
*/

import ADD_ALERT from "./ADD_ALERT";

export default async function ADD_BADGE(badgesRef, userRef, badgeObject) {

  let userId;
  let userBadges = [];

  await userRef.get().then(doc => {
    userId = doc.id;
  });

  await userRef.collection('badges').get().then(snap => {
    snap.forEach(doc => {
      userBadges.push(doc.id);
    })
  })

  if (userBadges.includes(badgeObject.idTag)) {
    // add one to the badges amount property.
    let badgeData;

    await userRef.collection('badges').doc(badgeObject.idTag).get().then(doc => {
      badgeData = doc.data();
    })

    userRef.collection('badges').doc(badgeObject.idTag).set({
      ...badgeData,
      amount: Number(badgeData.amount) + 1,
    });

    if (Number(badgeData.amount) === 99 && badgeObject.title === 'Fearless') {

      const timestamp = new Date();
      ADD_BADGE(badgesRef, userRef, {
        title: "Computer's Nightmare",
        description: "Defeat the Computer's Master Card 100 times.",
        rank: 5,
        idTag: 'computers_nightmare',
        firstEarned: timestamp,
      });
    }
  } else {

    let badgeData;
    await badgesRef.doc(badgeObject.idTag).get().then(doc => {
      badgeData = doc.data();
    })

    badgeData.users.push(userId);

    badgesRef.doc(badgeObject.idTag).set({
      ...badgeData,
    });

    await userRef.collection('badges').doc(badgeObject.idTag).set({
      title: badgeObject.title,
      description: badgeObject.description,
      rank: badgeObject.rank,
      amount: 1,
      firstEarned: badgeObject.firstEarned,
    });

    const message = `You have earned the ${badgeObject.title} badge!`;
    await ADD_ALERT(userRef.collection('alerts'), message, badgeObject.firstEarned, 'new badge');
  }
}