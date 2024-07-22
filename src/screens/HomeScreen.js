import React, { useState } from "react";
import { ScrollView, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ExperienceInput from "../components/ExperienceInput";
import EducationInput from "../components/EducationInput";
import SkillsInput from "../components/SkillsInput";
import { generatePDF } from "../components/GeneratePDF";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [github, setGithub] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleAddExperience = (experience) => {
    setExperiences([...experiences, experience]);
  };

  const handleDeleteExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const handleAddEducation = (education) => {
    setEducations([...educations, education]);
  };

  const handleDeleteEducation = (index) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducations(newEducations);
  };

  const handleAddSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const handleDeleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleGeneratePDF = async () => {
    const resumeData = {
      name,
      email,
      phone,
      github,
      experiences,
      educations,
      skills,
    };
    await generatePDF(resumeData);
  };

  const handleSubmit = async () => {
    const resumeData = {
      name,
      email,
      phone,
      github,
      experiences,
      educations,
      skills,
    };
    await AsyncStorage.setItem("resumeData", JSON.stringify(resumeData));
    navigation.navigate("Preview", { resumeData });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="GitHub"
        value={github}
        onChangeText={setGithub}
      />
      <ExperienceInput
        onAddExperience={handleAddExperience}
        onDeleteExperience={handleDeleteExperience}
        experiences={experiences}
      />
      <EducationInput
        onAddEducation={handleAddEducation}
        onDeleteEducation={handleDeleteEducation}
        educations={educations}
      />
      <SkillsInput
        onAddSkill={handleAddSkill}
        onDeleteSkill={handleDeleteSkill}
        skills={skills}
      />
      <Button title="Preview" onPress={handleSubmit} />
      <Button title="Generate PDF" onPress={handleGeneratePDF} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default App;
