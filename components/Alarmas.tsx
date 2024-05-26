// components/Alarmas.tsx

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TextInput, Switch, Modal, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import moment from 'moment';

type AlarmasProps = {
  navigation: NavigationProp<RootStackParamList>;
};

type Alarma = {
  id: number;
  time: string;
  days: string[];
  name: string;
  enabled: boolean;
};

const Alarmas: React.FC<AlarmasProps> = ({ navigation }) => {
  const [alarmas, setAlarmas] = useState<Alarma[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState<string | null>(null);
  const [newAlarmDays, setNewAlarmDays] = useState<string[]>([]);
  const [newAlarmName, setNewAlarmName] = useState('');

  const daysOfWeek = [
    { day: "Lunes", label: "L" },
    { day: "Martes", label: "Ma" },
    { day: "Miércoles", label: "Mi" },
    { day: "Jueves", label: "J" },
    { day: "Viernes", label: "V" },
    { day: "Sábado", label: "S" },
    { day: "Domingo", label: "D" }
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setNewAlarmTime(moment(date).format('HH:mm'));
    hideDatePicker();
  };

  const toggleDay = (day: string) => {
    setNewAlarmDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const addAlarm = () => {
    if (newAlarmTime && newAlarmName && newAlarmDays.length > 0) {
      const newAlarm: Alarma = {
        id: alarmas.length + 1,
        time: newAlarmTime,
        days: newAlarmDays,
        name: newAlarmName,
        enabled: true,
      };
      setAlarmas([...alarmas, newAlarm]);
      setModalVisibility(false);
      setNewAlarmTime(null);
      setNewAlarmDays([]);
      setNewAlarmName('');
    }
  };

  const toggleAlarm = (id: number) => {
    setAlarmas(alarmas.map(alarm => alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm));
  };

  return (
    <View style={styles.container}>
      <View style={styles.alarmHeader}>
        <Image source={require('../imagenes/clock.png')}  style={styles.alarmIcon} />
        <Text style={styles.alarmText}>Alarmas</Text>
      </View>
      <TouchableOpacity style={styles.newAlarmButton} onPress={() => setModalVisibility(true)}>
        <Text style={styles.newAlarmButtonText}>Nueva Alarma</Text>
      </TouchableOpacity>

      <FlatList
        data={alarmas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <View style={styles.alarmText}>
              <Text style={styles.alarmName}>{item.name}</Text>
              <Text>{item.time} - {item.days.join(', ')}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleAlarm(item.id)}
            />
          </View>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nueva Alarma</Text>
          <Button title="Seleccionar Hora" onPress={showDatePicker} color="#34CC91" />
          <Text style={styles.selectedTime}>{newAlarmTime}</Text>

          <Text style={styles.sectionTitle}>Días</Text>
          <View style={styles.daysContainer}>
            {daysOfWeek.map(({ day, label }) => (
              <TouchableOpacity 
                key={day} 
                style={[
                  styles.dayButton, 
                  newAlarmDays.includes(day) && styles.selectedDayButton
                ]} 
                onPress={() => toggleDay(day)}
              >
                <Text style={[
                  styles.dayButtonText, 
                  newAlarmDays.includes(day) && styles.selectedDayButtonText
                ]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Nombre de la alarma"
            style={styles.input}
            value={newAlarmName}
            onChangeText={setNewAlarmName}
          />
          <View style={styles.modalButtons}>
            <Button title="Añadir" onPress={addAlarm} color="#34CC91" />
            <Button title="Cancelar" onPress={() => setModalVisibility(false)} color="#34CC91" />
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#45504C',
  },
  newAlarmButton: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#34CC91',
    borderRadius: 5,
    alignItems: 'center',
  },
  newAlarmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  alarmText: {
    flex: 1,
    fontSize: 30, // Ajusta el tamaño de fuente para que coincida con el título
    fontWeight: 'bold',
    color: '#45504C',
  },
  alarmName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  alarmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  alarmIcon: {
    width: 50, 
    height: 50,
    marginRight: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedTime: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: '#34CC91',
    borderColor: '#34CC91',
  },
  dayButtonText: {
    color: '#45504C',
    fontWeight: 'bold',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
});

export default Alarmas;

