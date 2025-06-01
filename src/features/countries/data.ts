export type Country = {
  id: string;
  name: string;
  slug: string;
};

export const getCountries = async () => {
  try {
    const response = await fetch("https://phimapi.com/quoc-gia");
    const data = await response.json();
    return data as Country[];
  } catch (error) {
    console.log("getCountries error", error);
    return [];
  }
};
