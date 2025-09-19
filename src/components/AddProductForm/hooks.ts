import { useMemo } from "react";

// SKU Generation Logic
export const useSkuGeneration = (
  watchedAttributes: Array<{ name: string; values: string[] }>
) => {
  return useMemo(() => {
    const validAttributes = watchedAttributes.filter(
      (attr) => attr.name && attr.values && attr.values.length > 0
    );

    if (validAttributes.length === 0) return [];

    const values = validAttributes.map((attr) => attr.values);

    const combinations = values.reduce(
      (acc: string[][], curr: string[]) => {
        const result: string[][] = [];
        for (const a of acc) {
          for (const c of curr) {
            result.push([...a, c]);
          }
        }
        return result;
      },
      [[]]
    );

    return combinations.map((combo: string[]) => ({
      model: combo.join(" / "),
      price: "",
      numberInStock: "",
    }));
  }, [watchedAttributes]);
};
