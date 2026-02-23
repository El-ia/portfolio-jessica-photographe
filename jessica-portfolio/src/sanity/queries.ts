export const homePhotosQuery = `
  *[_type == "photo" && showOnHome == true] | order(order asc) {
    _id,
    title,
    alt,
    image,
    crops {
      home,
      plateau,
      social,
      evenementiel
    }
  }
`;

export const slideshowPhotosQuery = `
  *[_type == "photo" && showInSlideshow == true] | order(slideshowOrder asc) {
    _id,
    title,
    alt,
    image,
    crops {
      home
    }
  }
`;

export const photosByCategoryQuery = `
  *[_type == "photo" && category == $category] | order(order asc) {
    _id,
    title,
    alt,
    image,
    crops {
      home,
      plateau,
      social,
      evenementiel
    }
  }
`;