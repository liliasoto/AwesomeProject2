import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TextInput, Switch, Modal, Image, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import moment from 'moment';
import { useUser } from './UserContext';
import axios from 'axios';
import { API_URL } from '../config';

type AlarmasProps = {
  navigation: NavigationProp<RootStackParamList>;
};

type Alarma = {
  _id: string;
  time: string;
  days: string[];
  name: string;
  enabled: boolean;
};

const Alarmas: React.FC<AlarmasProps> = ({ navigation }) => {
  const { userId } = useUser();
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

  useEffect(() => {
    fetchAlarmas();
  }, [userId]);

  const fetchAlarmas = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is not available');
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/alarmas/usuario/${userId}`);
      setAlarmas(response.data);
    } catch (error) {
      console.error('Error fetching alarms', error);
      Alert.alert('Error', 'Error fetching alarms from server');
    }
  };

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

  const addAlarm = async () => {
    if (newAlarmTime && newAlarmName && newAlarmDays.length > 0) {
      const newAlarm = {
        usuario_id: userId,
        time: newAlarmTime,
        days: newAlarmDays,
        name: newAlarmName,
        enabled: true,
      };
      try {
        const response = await axios.post(`${API_URL}/alarmas`, newAlarm);
        setAlarmas([...alarmas, response.data]);
        setModalVisibility(false);
        setNewAlarmTime(null);
        setNewAlarmDays([]);
        setNewAlarmName('');
      } catch (error) {
        console.error('Error adding alarm', error);
        Alert.alert('Error', 'Error adding alarm to server');
      }
    }
  };

  const toggleAlarm = async (id: string) => {
    try {
      const alarmToUpdate = alarmas.find(alarm => alarm._id === id);
      if (alarmToUpdate) {
        const response = await axios.put(`${API_URL}/alarmas/${id}`, {
          ...alarmToUpdate,
          enabled: !alarmToUpdate.enabled
        });
        setAlarmas(alarmas.map(alarm => alarm._id === id ? response.data : alarm));
      }
    } catch (error) {
      console.error('Error toggling alarm', error);
      Alert.alert('Error', 'Error updating alarm on server');
    }
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
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <View style={styles.alarmText}>
              <Text style={styles.alarmName}>{item.name}</Text>
              <Text style={styles.alarmContent}>{item.time} - {item.days.join(', ')}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleAlarm(item._id)}
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
            placeholderTextColor="#D3D3D3"
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
    color: "#212121",
  },
  alarmName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "#212121",
  },
  alarmContent:{
    color: "#212121",
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
    color: "#212121",
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
    color: "#212121",
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



/*
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import PushNotification, { Importance } from 'react-native-push-notification'
import ListAlarms from './ListAlarms'
import TimePicker from './TimePicker'



const App = () => {

    useEffect(() => {
        createChannels();
    }, []);

    const createChannels = () => {
      PushNotification.createChannel(
        {
            channelId: "alarm-channel",
            channelName: "Alarm Channel",
            channelDescription: "Canal para alarmas",
            playSound: true,
            soundName: "default",
            importance: Importance.HIGH,
            vibrate: true,
        },
        (created) => {
            console.log(`Canal ${created ? "creado" : "no creado"}`);
            if (created) {
                console.log("Canal creado exitosamente");
            } else {
                console.error("Error al crear el canal");
            }
        }
      );
    };
    


    const handleNotification = () => {

        PushNotification.cancelAllLocalNotifications();

        
        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: "Alarm Ringing",

            message: "Message Here",
            importance: "high", // Importance.HIGH
            priority: "high",
            actions: ["Accept", "Reject"],
            date: new Date(Date.now() + 100),
            allowWhileIdle: true,
            invokeApp: false,

            //repeatTime: 2,
        });
    
        PushNotification.configure({
            onAction: function (notification) {
                if (notification.action === 'Accept') {
                    console.log('Alarm Snoozed');
                }
                else if (notification.action === 'Reject') {
                    console.log('Alarm Stoped');
                    //PushNotification.cancelAllLocalNotifications();
                }
                else {
                    console.log('Notification opened');
                }
            },
            
        });
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.heading}>ALARM</Text>
            <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                    handleNotification(),
                        console.log("Schedule Notification")
                }}>
            </Pressable>

            <SafeAreaView style={styles.listAlarms}>
                <ListAlarms />
            </SafeAreaView>
            <View style={styles.timePicker}>
                <TimePicker />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        fontSize: 25,
        padding: 20,
        color: 'black'
    },
    timePicker: {
        paddingTop: "10%",
        width: "50%",
        bottom: 20,
    },
    listAlarms: {
        flex: 1,
        width: "100%",
    },

    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 25,
    },

})

export default App;
*/