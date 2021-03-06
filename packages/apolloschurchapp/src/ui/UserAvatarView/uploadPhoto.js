import gql from 'graphql-tag';
import ImagePicker from 'react-native-image-picker';
import { client } from 'apolloschurchapp/src/client';
import { ReactNativeFile } from 'apollo-upload-client';
import getUserProfile from '../../tabs/connect/getUserProfile';

const options = {
  title: 'Select Profile Image',
  quality: 0,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function showImagePicker() {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        reject(response.didCancel);
      } else if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}

export default async ({ onUpload = () => ({}) }) => {
  try {
    const image = await showImagePicker();
    const file = new ReactNativeFile({
      uri: image.uri,
      name: image.fileName,
      type: 'image/jpeg',
    });
    onUpload();
    return client.mutate({
      mutation: gql`
        mutation uploadProfileImage($file: Upload!, $size: Int!) {
          uploadProfileImage(file: $file, size: $size) {
            id
            firstName
            lastName
            photo {
              uri
            }
          }
        }
      `,
      variables: { file, size: image.fileSize },
      update: (
        cache,
        {
          data: {
            uploadProfileImage: { photo },
          },
        }
      ) => {
        const data = cache.readQuery({ query: getUserProfile });

        cache.writeQuery({
          query: getUserProfile,
          data: {
            currentUser: {
              ...data.currentUser,
              profile: {
                ...data.currentUser.profile,
                photo,
              },
            },
          },
        });
      },
    });
  } catch (e) {
    return null;
  }
};
