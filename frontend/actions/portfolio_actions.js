import * as PortfolioUtil from "../util/portfolio_util";

export const RECEIVE_PORTFOLIO_ERRORS = "RECEIVE_PORTFOLIO_ERRORS";
export const REMOVE_PORTFOLIO = "REMOVE_PORTFOLIO";

export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";

export const START_LOADING_PORTFOLIOS = "START_LOADING_PORTFOLIOS";
export const START_CREATING_PORTFOLIO = "START_CREATING_PORTFOLIO";

export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

const receivePortfolioErrors = (errors) => ({
  type: RECEIVE_PORTFOLIO_ERRORS,
  errors,
});

const receivePortfolios = (portfolios) => ({
  type: RECEIVE_PORTFOLIOS,
  portfolios,
});

const receivePortfolio = (portfolio) => ({
  type: RECEIVE_PORTFOLIO,
  portfolio,
});

const startLoadingPortfolios = () => ({
  type: START_LOADING_PORTFOLIOS,
});
const startCreatingPortfolio = () => ({
  type: START_CREATING_PORTFOLIO,
});

export const createPortfolio = (portfolio) => (dispatch) => {
  dispatch(startCreatingPortfolio());
  return PortfolioUtil.createPortfolio(portfolio).then(
    (portfolio) => dispatch(receivePortfolio(portfolio)),
    (errs) => dispatch(receivePortfolioErrors(errs.responseJSON))
  );
};

export const updatePortfolio = (portfolio) => (dispatch) => {
  return PortfolioUtil.updatePortfolio(portfolio).then(
    (portfolio) => dispatch(receivePortfolio(portfolio)),
    (errs) => dispatch(receivePortfolioErrors(errs.responseJSON))
  );
};

export const fetchPortfolios = (currentUser) => (dispatch) => {
  dispatch(startLoadingPortfolios());
  PortfolioUtil.fetchPortfolios(currentUser).then(
    (portfolios) => {
      dispatch(receivePortfolios(portfolios));
    },
    (errs) => dispatch(receivePortfolioErrors(errs.responseJSON))
  );
};
