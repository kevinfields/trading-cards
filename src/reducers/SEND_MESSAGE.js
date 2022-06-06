export default async function SEND_MESSAGE(receiverRef, messageData) {
  await receiverRef.collection('messages').add({
    ...messageData,
  }).then(doc => {
    return doc.id;
  })
}