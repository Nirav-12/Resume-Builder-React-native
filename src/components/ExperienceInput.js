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

const ExperienceInput = ({
  onAddExperience,
  onDeleteExperience,
  experiences,
}) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExperience = () => {
    onAddExperience({ company, role, duration, description });
    setCompany("");
    setRole("");
    setDuration("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Experience" onPress={handleAddExperience} />
      <FlatList
        data={experiences}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>
              {item.company} - {item.role}
            </Text>
            <Text>{item.duration}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity
              onPress={() => onDeleteExperience(index)}
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

export default ExperienceInput;
