React Native Weather App:

- This repo is a React-Native cli application that I built in 3 days only that have integrations with Firebase,
  2 external REST APIs, Android Studio which is the editor for Android development.

Instructions how to run the application locally:

- You should have in your local machine :

* Android Studio
* Android SDK & JDK - in order to run Android Emulator
* React Native CLI installed
* Node.js version and other dependencies based on the React Native documentation.

Technologies explanation:

- Front - React-Native CLI - I create 2 flows in the app :

  1. user Authentication flow - when the user is lands in the app it check with onAuthChange listener of Firebase whether there is a loggedin user or not,
     If there is a user it fetch him to the current weather app, otherwise it navigate him to Login/Signup screens.
  2. The user can do those actions:
     A. Login with email and password
     B. Login with a link that provided to his email address after he type it and click the relevant button.
     C. Signup with email, password and other properties - behind the scenes the credentials got saved in Firebase authentication panel.
  3. The user can navigate since he is logged in to:
     A. Five Forecast days screen
     B. Current Weather screen.
     C. Logout page that allows him to log out.
  4. rendering Gifs conditionally based on the weather status that returns from the Rest API response -
     Using FastImage component to render the gif from package - react-native-fast-image

- State management - Redux - I created 2 reducer in Redux store:

  1. user - to maintain the user global state throughout the whole application
  2. weather - to inject weather data based on many parameters such as city,
     temperature etc' wherever I want in the app with props drilling and components hierocracy

- Navigation - React-Navigation:

  - I create 3 tabs navigators that allow the user navigate thought the app.
  - Screen logic condition - Login/Logout/Signup shown with the same bottom tab navigator with a condition that check if the user is logged in or not,
    and what is the current route.

- API's requests - Axios

- Apis - I use 2 REST-API:

  1. Openweathermap API - The first API gives me the city name and the city id in order to get
     relevant data for the weather in this city - reference link - https://openweathermap.org
  2. Accuweather API - The second API gives me the five days forecast for each city and the autocomplete endpint that return a list of city based on the input I type - reference url - https://developer.accuweather.com/accuweather-locations-api/apis

- Authentication - I use Firebase Authentication - 2 methods:
  1.  email & password
  2.  passwordless - a method that you type an email and it send you an email to the provided email address and then in the email you receive you have a link the points back to the app and this process is equivalent to other signin methods.

![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/forecast-screen.png)
![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/forecast-screen2.png)
![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/forecast-screen3.png)
![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/logout-screen.png)
![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/Signup.png)
![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/Login.png)
![alt text](https://github.com/EvyatarHaim1/Weather-app-react-native/blob/main/assets/screenshots/current-weather.png)
