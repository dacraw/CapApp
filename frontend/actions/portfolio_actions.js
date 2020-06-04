export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIO_ERRORS = "RECEIVE_PORTFOLIO_ERRORS";
import * as PortfolioUtil from '../util/portfolio_util'

const receivePortfolio = portfolio => ({
    type: RECEIVE_PORTFOLIO,
    portfolio,
})

const receivePortfolioErrors = errors => ({
    type: RECEIVE_PORTFOLIO_ERRORS,
    errors,
})

export const createPortfolio = portfolio => dispatch => (
    PortfolioUtil.createPortfolio(portfolio)
        .then( 
            newPortfolio => dispatch(receivePortfolio(newPortfolio)),
            errs => dispatch(receivePortfolioErrors(errs.responseJSON))
        )
)