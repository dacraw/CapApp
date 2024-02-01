export const createPortfolio = (portfolio) => {
  return $.ajax({
    method: "POST",
    url: "api/portfolios",
    data: { portfolio },
  });
};

export const fetchPortfolios = (currentUser) =>
  $.ajax({
    url: `api/users/${currentUser}/portfolios`,
  });

export const updatePortfolio = (portfolio) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${portfolio.user_id}/portfolios/${portfolio.symbol}`,
    data: { portfolio },
  });
};
