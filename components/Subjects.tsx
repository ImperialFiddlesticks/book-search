import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip, useTheme } from "react-native-paper";

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
  const theme = useTheme();

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

  const chipStyle = {
    colors: {
      secondaryContainer: theme.colors.secondary,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        accessibilityRole="list"
        accessibilityLabel="Filter by subject"
      >
        <Chip
          mode={selectedSubjects.length === 0 ? "flat" : "outlined"}
          selected={selectedSubjects.length === 0}
          onPress={() => handleToggle("")}
          style={[styles.chip, { borderRadius: 2 }]}
          theme={chipStyle}
          accessibilityLabel="All subjects"
          accessibilityHint="Shows all results"
          accessibilityRole="togglebutton"
          accessibilityState={{ checked: selectedSubjects.length === 0 }}
        >
          All
        </Chip>
        {subjects.map((subject) => (
          <Chip
            key={subject}
            mode={selectedSubjects.includes(subject) ? "flat" : "outlined"}
            selected={selectedSubjects.includes(subject)}
            onPress={() => handleToggle(subject)}
            style={[styles.chip, { borderRadius: 2 }]}
            theme={chipStyle}
            accessibilityRole="togglebutton"
            accessibilityLabel={subject}
            accessibilityHint={
              selectedSubjects.includes(subject)
                ? "Remove filter"
                : "Filter by subject"
            }
            accessibilityState={{ checked: selectedSubjects.includes(subject) }}
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
    paddingVertical: 5,
    marginHorizontal: -16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 4,
  },
  chip: {
    marginRight: 8,
  },
});
