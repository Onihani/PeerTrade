const TradeFilters = () => {
  return (
    <div className="trade-filters">
      <div className="trade-filters__item">
        <label>Symbol</label>
        <input type="text" />
      </div>
      <div className="trade-filters__item">
        <label>Side</label>
        <select>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div className="trade-filters__item">
        <label>Status</label>
        <select>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="trade-filters__item">
        <label>Date</label>
        <input type="date" />
      </div>
      <div className="trade-filters__item">
        <button>Search</button>
      </div>
    </div>
  );
}

export default TradeFilters;