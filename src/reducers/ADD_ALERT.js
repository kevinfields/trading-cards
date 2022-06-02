export default async function ADD_ALERT(alertRef, message, time, type) {
  await alertRef.add({
    message: message,
    timestamp: time,
    read: false,
    type: type,
  })
}