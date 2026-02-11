import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

const Booksearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search book"
        onChangeText={setSearchQuery}
        value={searchQuery}
        traileringIcon="microphone"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Booksearchbar;
