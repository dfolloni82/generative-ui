type StockProps = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
};

export function Stock({
  symbol,
  price,
  change,
  changePercent,
  high,
  low,
  volume,
}: StockProps) {
  const isPositive = change >= 0;

  const formatVolume = (vol: number) => {
    if (vol >= 1000000) {
      return (vol / 1000000).toFixed(2) + 'M';
    }
    if (vol >= 1000) {
      return (vol / 1000).toFixed(2) + 'K';
    }
    return vol.toString();
  };

  return (
    <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-4 shadow-lg max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-xl text-white">{symbol}</h3>
          <span className="text-xs text-gray-400">Stock</span>
        </div>
        <div
          className={`px-2 py-1 rounded text-sm font-medium ${
            isPositive
              ? 'bg-green-900/50 text-green-400'
              : 'bg-red-900/50 text-red-400'
          }`}
        >
          {isPositive ? '↑' : '↓'} {Math.abs(changePercent).toFixed(2)}%
        </div>
      </div>

      <div className="mb-3">
        <span className="text-3xl font-bold text-white">
          ${price.toFixed(2)}
        </span>
        <span
          className={`ml-2 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}
        >
          {isPositive ? '+' : ''}
          {change.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm border-t border-gray-600 pt-3">
        <div>
          <span className="block text-xs text-gray-400">High</span>
          <span className="font-medium text-gray-200">${high.toFixed(2)}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400">Low</span>
          <span className="font-medium text-gray-200">${low.toFixed(2)}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400">Volume</span>
          <span className="font-medium text-gray-200">{formatVolume(volume)}</span>
        </div>
      </div>
    </div>
  );
}
