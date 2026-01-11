import slugify from "slugify";
export const getSlug = (text: string): string => {
  return slugify(text, {
    lower: true,
  });
};
