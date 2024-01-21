import {TextInputProps} from 'react-native';

export interface AuthProvider {
  onAuthStateChanged: (
    onUserChanged: (userEmail: string | null) => void,
  ) => () => void;
}

export interface UserInput {
  key: string;
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address' | 'default';
}

export interface DayData {
  Temperature: {
    Maximum: {
      Value: number;
    };
  };
}

export interface ChartProps {
  forecast: DayData[];
}

export type WeatherCardProps = {
  day: string;
  temperature: number;
  status: string;
  weatherStatus?: string;
};

export interface UserInfoProps {
  userEmail: string;
  weatherStatus: string;
  onSignOut: () => void;
}

export interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
  onSignInWithLink: (email: string) => void;
  onNavigateSignUp: () => void;
  onGoogleSignIn: () => void;
}

export interface IAuthProvider {
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signUpWithEmail: (email: string, password: string) => Promise<any>;
  sendSignInLinkToEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  onAuthStateChanged: (onUserChanged: any) => () => void;
}

export interface InputField {
  key: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
}
