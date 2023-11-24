import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, Image, Dimensions, Picker, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLaunchessData, logoutFunction } from '../redux/action';
import CustomTextInput from '../Components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

  // define stats
  const [searchByName, setSearchByName] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const dispatch = useDispatch();
  const launchesData = useSelector((state) => state.reducer.launchesData);
  const logoutSuccess = useSelector((state) => state.reducer.logoutSuccess);
  const getLaunchesDataProcessing = useSelector((state) => state.reducer.getLaunchesDataProcessing);
  const navigation = useNavigation();

  // Effect for fetching data based on filters
  useEffect(() => {
    dispatch(getLaunchessData(searchByName, selectedYear, selectedStatus));
  }, [searchByName, selectedYear, selectedStatus]);

  // Format timestamp into a user-readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };


  // diapatch logout function
  const logout = () => {
    dispatch(logoutFunction());
  };

  // Generate years from 1950 to 2023
  const years = Array.from({ length: 25 }, (_, index) => 2000 + index);


  useEffect(()=>{
    navigation.replace('/');
  },[logoutSuccess])

  return (
    <View style={styles.container}>

      {/* Logout Button */}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>


      {/* Input for searching by name */}
      <View style={styles.searchBox} >
        <CustomTextInput
          labelText={'Search By launch Title:'}
          placeHolderText={'Search By launch Title'}
          onChangeText={(text) => setSearchByName(text)}
        />
      </View>

      {/* Pickers for selecting year */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => {
            // If the default option is selected, set the value to an empty string
            setSelectedYear(itemValue === "" ? "" : itemValue);
          }}>

          {/*  append all years */}
          <Picker.Item label="Select Year" value="" />
          {years.map((year) => (
            <Picker.Item key={year} label={String(year)} value={String(year)} />
          ))}
        </Picker>


        {/* Pickers for selecting launch status */}
        <Picker
          selectedValue={selectedStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        >
          <Picker.Item label="Select Status" value="" />
          <Picker.Item label="Success" value="true" />
          <Picker.Item label="Fail" value="false" />
        </Picker>
      </View>

      {/* Display total items found */}
      <Text style={styles.heading}> Total Item Found: {launchesData.length} </Text>

      {/* Display data or loading indicator */}
      {getLaunchesDataProcessing ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <ScrollView contentContainerStyle={styles.tasksContainer}>
          {launchesData?.map((item, index) => (
            <View key={index} style={styles.card}>
              {/* Display mission details */}
              <Image
                source={{ uri: item.links.mission_patch_small }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.text}>{item.mission_name}</Text>
              <Text style={styles.text}>{formatDate(item.launch_date_local)}</Text>
              <Text style={styles.text}>{item.rocket.rocket_name}</Text>
              <Text style={styles.text}>{item.launch_site.site_name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginTop:20,
  },
  searchBox: {
    marginHorizontal: "20px",
    width: "94vw",
    marginTop: 18
  },
  tasksContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: "280px",
    height: "320px"
    // width: screenWidth > 1024 ? '80%' : '90%',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  heading: {
    fontWeight: 'bold',
    paddingTop: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:10
  },
  picker: {
    height: 50,
    width: '45%',
    borderRadius: 6,

  },
  logoutButton: {
    position: 'absolute',
    top: 0,
    right: 38,
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
