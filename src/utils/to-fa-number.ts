const toFaPercent = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(value)}٪`;

export default toFaPercent;
