export const homePhotosQuery = `
  *[_type == "photo" && showOnHome == true] | order(order asc) {
    _id,
    title,
    alt,
    image
  }
`;

export const slideshowPhotosQuery = `
  *[_type == "photo" && showInSlideshow == true] | order(slideshowOrder asc) {
    _id,
    title,
    alt,
    image
  }
`;