import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

const APYHUB_TOKEN =
  "APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X";

const Booksearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recording, setRecording] = React.useState<Audio.Recording | null>(
    null,
  );
  async function uploadAudio(uri: string) {
    console.log("FUNKA FUCKIN SKITENN????");

    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log("Uploading audio to APYHub...", uri);
    try {
      const audioFile = {
        uri: uri,
        name: "recording.m4a",
        type: "audio/m4a",
      };
      const formData = new FormData();
      formData.append("file", audioFile as any);
      formData.append("language", "en-US");
      const response = await fetch("https://api.apyhub.com/stt/file", {
        method: "POST",
        headers: {
          "apy-token": APYHUB_TOKEN,
          Accept: "application/json",
        },
        body: formData,
      });
      const result = await response.json();
      console.log("Full API Response:", JSON.stringify(result, null, 2));

      if (response.ok && result.data) {
        console.log("Transcription successful:", result.data);
        setSearchQuery(result.data);
      } else {
        console.error("Transcription failed:", result.error);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      setSearchQuery("");
    }
  }

  useEffect(() => {
    const getPermissions = async () => {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,

          playsInSilentModeIOS: true,
        });
      }
    };

    getPermissions();
  }, []);

  async function startRecording() {
    try {
      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording...");
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    console.log("Recording stopped and stored at", uri);
    if (uri) {
      uploadAudio(uri);
    }
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search book"
        onChangeText={setSearchQuery}
        value={searchQuery}
        traileringIcon={recording ? "stop" : "microphone"}
        onTraileringIconPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Booksearchbar;
