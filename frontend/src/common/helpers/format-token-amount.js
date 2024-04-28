const formatTokenAmount = (amount = "1", decimals = 1) => {
  const amountString = amount.toString();
  const integerPart = amountString.slice(0, -decimals) || "0";
  const fractionalPart = amountString.slice(-decimals).padStart(decimals, "0");

  return Number(`${integerPart}.${fractionalPart}`);
};

export default formatTokenAmount;