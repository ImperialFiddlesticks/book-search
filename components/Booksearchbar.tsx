import {
  AudioModule,
  AudioQuality,
  IOSOutputFormat,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as React from "react";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useRouter } from "expo-router";
import ScannerButton from "./ScannerButton";
import { useStore } from "../store/previousSearched";

const APYHUB_TOKEN =
  "APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X";

const Booksearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();
  const { addPreviousSearched } = useStore();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addPreviousSearched(searchQuery.trim());
      router.push({
        pathname: "/searchResults",
        params: { query: searchQuery },
      });
    }
  };

  const audioRecorder = useAudioRecorder({
    extension: ".m4a",
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,

    ios: {
      extension: ".wav",
      outputFormat: IOSOutputFormat.LINEARPCM,
      audioQuality: AudioQuality.MAX,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    android: {
      extension: ".m4a",
      outputFormat: "mpeg4",
      audioEncoder: "aac",
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 128000,
    },
  });

  const recorderState = useAudioRecorderState(audioRecorder);

  useEffect(() => {
    const getPermissions = async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();

      if (permission.status === "granted") {
        console.log("Audio recording permission granted");
      }
    };

    getPermissions();
  }, []);

  async function uploadAudio(uri: string) {
    console.log("Uploading audio to APYHub...", uri);

    const audioUri =
      Platform.OS === "android" && !uri.startsWith("file://")
        ? `file://${uri}`
        : uri;

    const fileExtension = Platform.OS === "android" ? "m4a" : "wav";
    const mimeType = Platform.OS === "android" ? "audio/mp4" : "audio/wav";

    try {
      const formData = new FormData();

      const file: any = {
        uri: audioUri,
        name: `recording.${fileExtension}`,
        type: mimeType,
      };

      formData.append("file", file as any);
      formData.append("language", "en-US");

      console.log("Sending request to APYHub");

      const response = await fetch("https://api.apyhub.com/stt/file", {
        method: "POST",
        headers: {
          "apy-token": APYHUB_TOKEN,
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

  async function startRecording() {
    try {
      const perms = await AudioModule.getRecordingPermissionsAsync();
      if (!perms.granted) {
        await AudioModule.requestRecordingPermissionsAsync();
      }
      console.log("Starting recording...");
      await audioRecorder.prepareToRecordAsync();
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording...");
      await audioRecorder.stop();

      const uri = audioRecorder.uri;
      console.log("Recording stopped and stored at", uri);

      if (uri) {
        uploadAudio(uri);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search book"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        traileringIcon={recorderState.isRecording ? "stop" : "microphone"}
        onTraileringIconPress={
          recorderState.isRecording ? stopRecording : startRecording
        }
      />
      <ScannerButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", padding: 10 },
});

export default Booksearchbar;
