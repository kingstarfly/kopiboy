export function generateDrinkPermutations(): [string, ...string[]] {
  // const bases = ["Kopi", "Teh"];
  // const modifiers = {
  //   milk: ["O", "C", ""],
  //   sugar: ["Kosong", "Siew Dai", "Gah Dai", ""],
  //   strength: ["Gau", "Po", ""],
  //   temperature: ["Peng", "Di Lo", ""],
  // };

  // return bases.flatMap((base) =>
  //   Object.values(modifiers).reduce(
  //     (acc, group) =>
  //       acc.flatMap((order) =>
  //         group.map((mod) => order + (mod ? ` ${mod}` : "")),
  //       ),
  //     [base],
  //   ),
  // ) as [string, ...string[]];

  const kopiDrinks = [
    "Kopi O",
    "Kopi O Siew Dai",
    "Kopi O Gau",
    "Kopi O Po",
    "Kopi O Peng",
    "Kopi O Gau Peng",
    "Kopi O Kosong",
    "Kopi O Kosong Peng",
    "Kopi O Gau Kosong Peng",
    "Kopi O Kosong Di Lo",
    "Kopi",
    "Kopi Po",
    "Kopi Gau",
    "Kopi Gah Dai",
    "Kopi Siew Dai",
    "Kopi Peng",
    "Kopi Gau Peng",
    "Kopi C",
  ];

  const tehDrinks = [
    "Teh O",
    "Teh O Siew Dai",
    "Teh O Gau",
    "Teh O Po",
    "Teh O Peng",
    "Teh O Gau Peng",
    "Teh O Kosong",
    "Teh O Kosong Peng",
    "Teh O Gau Kosong Peng",
    "Teh O Kosong Di Lo",
    "Teh",
    "Teh Po",
    "Teh Gau",
    "Teh Gah Dai",
    "Teh Siew Dai",
    "Teh Peng",
    "Teh Gau Peng",
    "Teh C",
  ];

  return [...kopiDrinks, ...tehDrinks] as [string, ...string[]];
}
