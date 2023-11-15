const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
// console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
// console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => {
  console.log('a', a)
  console.log('b', b)
  return a - b
});
// console.log(sortedValues); // [1, 2, 10, 21]
// console.log(values); // [1, 10, 21, 2]
