import * as NewsUtil from '../util/newsUtil'

export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_NEWS_ERRORS = "RECEIVE_NEWS_ERRORS";

const receiveNews = news => ({
    type: RECEIVE_NEWS,
    news,
});

const receiveNewsErrors = errs => ({
    type: RECEIVE_NEWS_ERRORS,
    errs
});

export const fetchBusinessNews = () => dispatch => (
    NewsUtil.fetchBusinessNews()
        .then(
            res => dispatch(receiveNews(res)),
            errs => dispatch(receiveNewsErrors(errs.responseText))
        )
);