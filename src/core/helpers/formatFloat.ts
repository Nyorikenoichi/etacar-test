export const formatFloat = (value: string): string => {
  const numericalValue = parseFloat(value);
  if (numericalValue > 1000000000) {
    return `${(numericalValue / 1000000000).toFixed(2)}b`;
  }
  if (numericalValue > 1000000) {
    return `${(numericalValue / 1000000).toFixed(2)}m`;
  }
  if (numericalValue > 1000) {
    return `${(numericalValue / 1000).toFixed(2)}k`;
  }
  return numericalValue.toFixed(2).toString();
};
