type WeatherProps = {
  location: string;
  weather: string;
  temperature: number;
  humidity: number;
  wind: number;
};

export function Weather({
  location,
  weather,
  temperature,
  humidity,
  wind,
}: WeatherProps) {
  const getWeatherEmoji = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'partly cloudy':
        return '⛅';
      case 'snowy':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow-lg max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{location}</h3>
        <span className="text-3xl">{getWeatherEmoji(weather)}</span>
      </div>
      <div className="text-4xl font-bold mb-2">{temperature}°C</div>
      <div className="text-blue-100 text-sm mb-3">{weather}</div>
      <div className="flex justify-between text-sm text-blue-100 border-t border-blue-300/50 pt-2">
        <div>
          <span className="block text-xs opacity-75">Humidity</span>
          <span>{humidity}%</span>
        </div>
        <div>
          <span className="block text-xs opacity-75">Wind</span>
          <span>{wind} km/h</span>
        </div>
      </div>
    </div>
  );
}
