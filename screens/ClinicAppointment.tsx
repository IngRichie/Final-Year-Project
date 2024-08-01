import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import { useDarkMode } from '../components/DarkModeContext';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type Props = {
  navigation: any;
};

const ClinicAppointment: React.FC<Props> = ({ navigation }) => {
  const { isDarkModeEnabled } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [currentYear, setCurrentYear] = useState(moment().format('YYYY'));
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    const days = Array.from({ length: moment().daysInMonth() }, (_, i) => i + 1);
    setDaysInMonth(days);
  }, []);

  const renderDateItem = ({ item }: { item: number }) => (
    <DateItem
      onPress={() => setSelectedDate(item)}
      selected={item === selectedDate}
      isDarkModeEnabled={isDarkModeEnabled}
    >
      <DateText selected={item === selectedDate} isDarkModeEnabled={isDarkModeEnabled}>
        {item}
      </DateText>
    </DateItem>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkModeEnabled ? '#1c1c1c' : '#318ce7' }}>
      <Container>
        <Header>
          <MonthText>{`${currentMonth} ${currentYear}`}</MonthText>
        </Header>
        <DateScrollerContainer>
          <FlatList
            data={daysInMonth}
            keyExtractor={(item) => item.toString()}
            renderItem={renderDateItem}
            numColumns={7}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          />
        </DateScrollerContainer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #318ce7;
`;

const Header = styled.View`
  padding: ${responsiveWidth(4)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MonthText = styled.Text`
  color: #fff;
  font-size: ${responsiveFontSize(4.5)}px;
  text-align: center;
`;

const DateScrollerContainer = styled.View`
  flex: 1;
  background-color: #318ce7;
`;

const DateItem = styled(TouchableOpacity)<{ selected: boolean; isDarkModeEnabled: boolean }>`
  align-items: center;
  justify-content: center;
  width: ${responsiveWidth(12)}px;
  height: ${responsiveHeight(8)}px;
  margin: ${responsiveWidth(1)}px;
  background-color: ${({ selected, isDarkModeEnabled }) =>
    selected ? '#fff' : isDarkModeEnabled ? '#444' : 'transparent'};
  border-radius: 10px;
`;

const DateText = styled.Text<{ selected: boolean; isDarkModeEnabled: boolean }>`
  color: ${({ selected, isDarkModeEnabled }) => (selected ? '#318ce7' : isDarkModeEnabled ? '#fff' : '#fff')};
  font-size: ${responsiveFontSize(3)}px;
  font-weight: bold;
`;

export default ClinicAppointment;
