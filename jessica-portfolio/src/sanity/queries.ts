const cropsAndOrderSelection = `
image,
"crops": { home, plateau, social, evenementiel },
"orderByPage": { home, plateau, social, evenementiel },
orderFallback
`;

export const homePhotosQuery = `
  *[_type == "photo" && showOnHome == true]
  | order(coalesce(orderByPage.home, orderFallback) asc) {
    _id, title, alt,
    ${cropsAndOrderSelection}
  }
`;

export const slideshowPhotosQuery = `
  *[_type == "photo" && showInSlideshow == true]
  | order(slideshowOrder asc) {
    _id, title, alt,
    ${cropsAndOrderSelection}
  }
`;

export const photosByCategoryQuery = `
  *[_type == "photo" && category == $category]
  | order(
      coalesce(
        select(
          $category == "plateau" => orderByPage.plateau,
          $category == "social" => orderByPage.social,
          $category == "evenementiel" => orderByPage.evenementiel,
          null
        ),
        orderFallback
      ) asc
    ) {
    _id, title, alt,
    ${cropsAndOrderSelection}
  }
`;