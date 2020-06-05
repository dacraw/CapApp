@stocks.each do |stock|
    json.set! stock.symbol do
        json.extract! stock, :symbol, :id
    end
end