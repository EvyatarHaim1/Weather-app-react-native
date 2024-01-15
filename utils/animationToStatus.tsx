// Define the module for importing GIF images in TypeScript
declare module '*.gif' {
  const value: any;
  export default value;
}

type AnimationToStatusFunction = (status: string) => any;

// Import images
const sunny = require('../assets/images/sunny.gif');
const rainy = require('../assets/images/rainy.gif');
const snow = require('../assets/images/snow.gif');
const cloudy = require('../assets/images/cloudy.gif');
const mostlySunny = require('../assets/images/mostly-sunny.gif');
const partlySunny = require('../assets/images/partly-sunny.gif');
const clear = require('../assets/images/clear.gif');
const overcast = require('../assets/images/overcast.gif');
const lightRain = require('../assets/images/light-rain.gif');
const sunAndClouds = require('../assets/images/sun-cloud.gif');
const mostlyCloudly = require('../assets/images/mostly-cloudly.gif');
const partlyCloudly = require('../assets/images/partlyCloudly.gif');
const thunderstorm = require('../assets/images/thunderstorm.gif');
const stormshowersday = require('../assets/images/stormshowersday.gif');
const hazySunshine = require('../assets/images/hazySunshine.gif');
const intermittentClouds = require('../assets/images/IntermittentClouds.gif');
const mostlyCloudyShowers = require('../assets/images/MostlyCloudyShowers.gif');
const showers = require('../assets/images/Showers.gif');
const defaultGif = require('../assets/images/defaultGif.gif');

// This function takes a weather status and returns the corresponding image source
export const animationToStatus: AnimationToStatusFunction = status => {
  switch (status) {
    case 'Sunny':
      return sunny;
    case 'Mostly sunny':
      return mostlySunny;
    case 'Partly sunny':
      return partlySunny;
    case 'Clear':
      return clear;
    case 'Overcast':
      return overcast;
    case 'Clouds and sun':
      return sunAndClouds;
    case 'Light rain':
      return lightRain;
    case 'Cloudy':
      return cloudy;
    case 'Partly cloudy':
      return partlyCloudly;
    case 'Mostly cloudy':
      return mostlyCloudly;
    case 'A shower':
      return rainy;
    case 'Snow':
      return snow;
    case 'Partly sunny w/ t-storms':
      return stormshowersday;
    case 'Thunderstorms':
      return thunderstorm;
    case 'Hazy sunshine':
      return hazySunshine;
    case 'Intermittent clouds':
      return intermittentClouds;
    case 'Mostly cloudy w/ showers':
      return mostlyCloudyShowers;
    case 'Showers':
      return showers;
    default:
      return defaultGif;
  }
};
