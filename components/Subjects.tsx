import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";

const subjects = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Historical",
  "Biography",
  "Horror",
  "Children",
];

interface SubjectsProps {
  selectedSubjects: string[];
  onSelectSubject: (subject: string[]) => void;
}

export default function SubjectChips({
  selectedSubjects,
  onSelectSubject,
}: SubjectsProps) {
  const handleToggle = (subject: string) => {
    if (subject === "") {
      onSelectSubject([]);
      return;
    }

    if (selectedSubjects.includes(subject)) {
      onSelectSubject(selectedSubjects.filter((s) => s !== subject));
    } else {
      onSelectSubject([...selectedSubjects, subject]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Chip
          mode={selectedSubjects.length === 0 ? "flat" : "outlined"}
          selected={selectedSubjects.length === 0}
          onPress={() => handleToggle("")}
          style={styles.chip}
        >
          All
        </Chip>
        {subjects.map((subject) => (
          <Chip
            key={subject}
            mode={selectedSubjects.includes(subject) ? "flat" : "outlined"}
            selected={selectedSubjects.includes(subject)}
            onPress={() => handleToggle(subject)}
            style={styles.chip}
          >
            {subject}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: -16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
});
