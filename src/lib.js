const formatCurrency = (number) => {
  if (number)
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
};
const formatPercent = (number) => {
  return Math.round(number * 100) / 100 + '%';
};
const formatMarketCap = (number) => {
  return '$' + Math.round((number * 100) / 100).toLocaleString('en-US');
};

export { formatCurrency, formatPercent, formatMarketCap };
