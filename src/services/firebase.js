import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return user.length > 0 ? user : false;
}

export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function getSuggestedUsers(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();
  return result.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id
    }))
    .filter((item) => item.userId !== userId && following.indexOf(item.userId) === -1);
}

export async function updateFollowing(userId, followingId, isFollowingProfile) {
  await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(followingId)
        : FieldValue.arrayUnion(followingId)
    });
}

export async function updateFollowers(profileToBeUpdated, userFollowingId, isFollowingProfile) {
  await firebase
    .firestore()
    .collection('users')
    .doc(profileToBeUpdated)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userFollowingId)
        : FieldValue.arrayUnion(userFollowingId)
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  console.log(userFollowedPhotos);

  const userFOllowedPhotosDetailsPromise = userFollowedPhotos.map(async (userFollowedPhoto) => {
    let likedPhoto = false;
    if (userFollowedPhoto.likes.includes(userId)) {
      likedPhoto = true;
    }
    const user = await getUserByUserId(userFollowedPhoto.userId);
    const { username } = user[0];
    return { ...userFollowedPhoto, likedPhoto, username };
  });

  return Promise.all(userFOllowedPhotosDetailsPromise);
}

export async function getPhotosByUsername(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}
