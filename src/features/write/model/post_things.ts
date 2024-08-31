export function postThings(prevState: any, formData: FormData) {
  const content = formData.get("content");
  //   const tags = formData.getAll("tags");
  const thumbnail = formData.get("thumbnail");

  console.log(content, tags, thumbnail);
}
