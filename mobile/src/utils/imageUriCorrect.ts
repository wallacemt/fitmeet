export function imageUriCorrect(url: string) {
  if (url.includes('localhost') || url.includes('localStack')) {
    url = `http://10.0.2.2:${
      url.split('http://localhost:')[1] || url.split('http://localStack:')[1]
    }`;
  }
  return url;
}
