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

const SkillsInput = ({ onAddSkill, onDeleteSkill, skills }) => {
  const [skill, setSkill] = useState("");

  const handleAddSkill = () => {
    onAddSkill(skill);
    setSkill("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Skill"
        value={skill}
        onChangeText={setSkill}
      />
      <Button title="Add Skill" onPress={handleAddSkill} />
      <FlatList
        data={skills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item}</Text>
            <TouchableOpacity
              onPress={() => onDeleteSkill(index)}
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

export default SkillsInput;
