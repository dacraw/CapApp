json.set! @portfolio.id do
    json.extract! @portfolio, :id, :cash_available
end