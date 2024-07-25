import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generatePDF } from "../components/GeneratePDF";
import WebView from "react-native-webview";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

const PreviewScreen = ({ route, navigation }) => {
  const { resumeData } = route.params;
  const [html, setHtml] = useState();

  const handleDownload = () => {
    let res = generatePDF(resumeData);
    setHtml(res);
  };

  const handleShare = async () => {
    const { uri } = await Print.printToFileAsync({ html: html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <View style={styles.container}>
      {!html ? (
        <View>
          <Text>Name: {resumeData.name}</Text>
          <Text>Email: {resumeData.email}</Text>
          <Text>Phone: {resumeData.phone}</Text>
          <Text>GitHub: {resumeData.github}</Text>
          <View>
            <Text>Experience:</Text>
            {resumeData.experiences.map((exp, index) => (
              <View key={index} style={styles.listItem}>
                <Text>Company: {exp.company}</Text>
                <Text>Role: {exp.role}</Text>
                <Text>Duration: {exp.duration}</Text>
                <Text>Description: {exp.description}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text>Education:</Text>
            {resumeData.educations.map((edu, index) => (
              <View key={index} style={styles.listItem}>
                <Text>School: {edu.school}</Text>
                <Text>Degree: {edu.degree}</Text>
                <Text>Year: {edu.year}</Text>
                <Text>CGPA: {edu.cgpa}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text>Skills:</Text>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.listItem}>
                {skill}
              </Text>
            ))}
          </View>
          <Button title="Previw PDF" onPress={handleDownload} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <WebView originWhitelist={["*"]} source={{ html: html }} />
          <Button title="Share PDF" onPress={handleShare} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    marginBottom: 10,
  },
});

export default PreviewScreen;
