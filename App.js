import React, { useState, useEffect } from 'react';
import { Text, ScrollView, ImageBackground, Image, View, TouchableOpacity } from 'react-native';
import { styles } from "./components/styles";

const API_KEY = 'a6db6214fc9c42d1950191808231010';
const API_URL = 'http://api.weatherapi.com/v1/current.json';

const getWeatherData = async (city) => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData('Huejutla,es');
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching initial weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const onPressWeatherButton = async (city) => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data for', city, ':', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          {weatherData?.current.condition.icon && (
            <Image
              source={{ uri: `http:${weatherData.current.condition.icon}` }}
              style={styles.weatherIcon}
            />
          )}
          <Text style={styles.header}>Weather in Huejutla</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressWeatherButton('Huejutla,es')}
          >
            <Text style={styles.buttonText}>Current Weather</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressWeatherButton('AnotherCity,es')}
          >
            <Text style={styles.buttonText}>Weather in Another City</Text>
          </TouchableOpacity>
        </View>

        {weatherData && (
          <View style={styles.weatherContainer}>
            <View style={styles.weatherHeader}>
              {weatherData.current.condition.icon && (
                <Image
                  source={{ uri: `http:${weatherData.current.condition.icon}` }}
                  style={styles.enlargedWeatherIcon}
                />
              )}
            </View>
            <Text style={styles.weatherTemp}>{weatherData.current.temp_c}°C</Text>
            <Text style={styles.weatherCondition}>{weatherData.current.condition.text}</Text>
            <Text style={styles.weatherInfo}>
              Wind: {weatherData.current.wind_kph} km/h | Humidity: {weatherData.current.humidity}%
            </Text>

            {/* Nuevos Detalles de la API */}
            <Text style={styles.detailText}>Feels Like: {weatherData.current.feelslike_c}°C</Text>
            <Text style={styles.detailText}>Pressure: {weatherData.current.pressure_mb} mb</Text>
            <Text style={styles.detailText}>Precipitation: {weatherData.current.precip_mm} mm</Text>
            {/* Puedes agregar más detalles según tus necesidades */}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );

};

export default WeatherApp;
