const formatterNumber = (n: number) => {
  if (n < 1000) {
    return n;
  } else {
    return `${(Math.floor(n / 100) / 10).toFixed(1)}k`;
  }
};

export default formatterNumber;
