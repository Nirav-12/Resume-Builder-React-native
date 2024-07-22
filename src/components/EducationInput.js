import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

const EducationInput = ({ onAddEducation, onDeleteEducation, educations }) => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleAddEducation = () => {
    onAddEducation({ school, degree, year, cgpa });
    setSchool("");
    setDegree("");
    setYear("");
    setCgpa("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="School"
        value={school}
        onChangeText={setSchool}
      />
      <TextInput
        style={styles.input}
        placeholder="Degree"
        value={degree}
        onChangeText={setDegree}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        style={styles.input}
        placeholder="CGPA"
        value={cgpa}
        onChangeText={setCgpa}
      />
      <Button title="Add Education" onPress={handleAddEducation} />
      <FlatList
        data={educations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>
              {item.school} - {item.degree}
            </Text>
            <Text>{item.year}</Text>
            <Text>{item.cgpa}</Text>
            <TouchableOpacity
              onPress={() => onDeleteEducation(index)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    marginVertical: 5,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default EducationInput;
