// imports.ts
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableOpacityProps,
  TextInput,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Homepage1 from "./screens/Homepage1";
import FirstAid from "./screens/FirstAid";
import SymptomAssessment from "./screens/SymptomAssessment";
import CounselorSession from "./screens/CounselorSession";
import DailyTipDetailScreen from "./screens/DailyTipDetailScreen";
import MedSchedule from "./screens/MedSchedule";
import FitnessNutrition from "./screens/FitnessNutrition";
import Settings from "./screens/Settings";

import CounselorDetails from "./screens/CounselorDetails";
import BookAppointment from "./screens/CounselorAppointment";
import AddMedication from "./screens/AddMedication";
import Menu from "./components/Menu";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgetPassword from "./screens/ForgetPassword";
import NewsPage from "./screens/NewsPage";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";


import AccessibilityScreen from "./screens/AccessibilityScreen";
import MentalHealth from "./screens/MentalHealth";
import { RootStackParamList } from "./types";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export {
  React,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableOpacityProps,
  TextInput,
  SafeAreaView,
  Pressable,
  StatusBar,
  NavigationContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createNativeStackNavigator,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  useFonts,
  AppLoading,
  KeyboardAwareScrollView,
  Homepage1,
  FirstAid,
  SymptomAssessment,
  CounselorSession,
  DailyTipDetailScreen,
  MedSchedule,
  FitnessNutrition,
  Settings,
  CounselorDetails,
  BookAppointment,
  AddMedication,
  Menu,
  WelcomeScreen,
  LoginScreen,
  SignUpScreen,
  ForgetPassword,
  NewsPage,
  NotificationScreen,
  ProfileScreen,

  AccessibilityScreen,
  MentalHealth,
  RootStackParamList,
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
  Drawer,
  Tab,
  Stack,
};
