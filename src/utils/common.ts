const colors = [
    '#FFAEAE',
    '#FFD7AE',
    '#FFFFAE',
    '#FFBBAE',
    '#D7FFAE',
    '#AEFFAE',
    '#AEFFD7',
    '#BBAEFF',
    '#E3AEFF',
    '#FFCDA1',
    '#FFA1EF',
    '#FFAEF2',
    '#FFE3AE',
    '#FFAECA',
    '#B4FFAE',
    '#AEFFF9',
    '#FFE3AE',
    '#FFA1C0'
];

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
