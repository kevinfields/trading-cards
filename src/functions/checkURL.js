export default function checkURL(url) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}