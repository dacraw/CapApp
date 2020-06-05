export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIO_ERRORS = "RECEIVE_PORTFOLIO_ERRORS";
export const REMOVE_PORTFOLIO = "REMOVE_PORTFOLIO"

import * as PortfolioUtil from '../util/portfolio_util'

const receivePortfolio = portfolio => ({
    type: RECEIVE_PORTFOLIO,
    portfolio,
})

const receivePortfolioErrors = errors => ({
    type: RECEIVE_PORTFOLIO_ERRORS,
    errors,
})

export const fetchPortfolio = userId => dispatch => {
//     debugger
    return (
        PortfolioUtil.fetchPortfolio(userId)
        .then( 
            portfolio => dispatch(receivePortfolio(portfolio)),
            errs => dispatch(receivePortfolioErrors(errs.responseJSON))
        )
    )
}