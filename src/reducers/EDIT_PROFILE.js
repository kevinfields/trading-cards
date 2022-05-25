export default async function EDIT_PROFILE(userRef, name, email, photo) {
  let data;

  await userRef.get().then((doc) => {
    data = doc.data();
  });

  data.name = name;
  data.email = email;
  data.photoURL = photo;

  userRef.set({
    ...data,
  });
}
