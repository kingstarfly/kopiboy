export function generateDrinkPermutations(): [string, ...string[]] {
  const bases = ["Kopi", "Teh"];
  const modifiers = {
    milk: ["O", "C", ""],
    strength: ["Gau", "Po", "Di Lo", ""],
    sugar: ["Kosong", "Siew Dai", "Gah Dai", ""],
    temperature: ["Peng", ""],
  };

  const additional = ["Milo", "Milo Peng", "Milo Dinosaur", "Diao Yu (Teabag)"];

  const permutations = bases
    .flatMap((base) =>
      Object.values(modifiers).reduce(
        (acc, group) =>
          acc.flatMap((order) =>
            group.map((mod) => order + (mod ? ` ${mod}` : "")),
          ),
        [base],
      ),
    )
    .concat(additional);

  permutations.sort((a, b) => a.split(" ").length - b.split(" ").length);

  return permutations as [string, ...string[]];
}
