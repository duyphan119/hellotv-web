export type Category = {
  id: string;
  name: string;
  slug: string;
};

export const getCategories = async () => {
  try {
    const response = await fetch("https://phimapi.com/the-loai");
    const data = await response.json();
    return data as Category[];
  } catch (error) {
    console.log("getCategories error", error);
    return [];
  }
};
