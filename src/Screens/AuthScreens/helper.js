/*components helper*/

/*convert to blob*/
export async function convertBlob(sourceUrl) {
  // first get our hands on the local file
  const localFile = await fetch(sourceUrl);
  // then create a blob out of it (only works with RN 0.54 and above)
  const fileBlob = await localFile.blob();
  // yay, let's print the result
  console.log(`Server said: ${JSON.stringify(fileBlob)}`);
}

export const generateBlob = (base64URL) => {
  console.log(base64URL);
  fetch(base64URL)
    .then((response) => response.blob())
    .then((response) => console.log('Your blob is' + response));
};
