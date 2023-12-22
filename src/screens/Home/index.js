import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { ModalPassword } from "../../components/Modal";

export function Home() {
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function handleGeneratePassword() {
    const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0, n = CHARSET.length; i < size; i++) {
      password += CHARSET.charAt(Math.floor(Math.random() * n));
    }

    setPasswordValue(password);
    setModalIsVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>{size} caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={20}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#f00"
          thumbTintColor="#392de9"
          value={size}
          onValueChange={value => setSize(value.toFixed(0))}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGeneratePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>
      <Modal visible={modalIsVisible} animationType="fade" transparent={true}>
        <ModalPassword
          passwordValue={passwordValue}
          handleClose={() => setModalIsVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  area: {
    marginVertical: 14,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6
  },
  button: {
    width: "80%",
    backgroundColor: "#392de9",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  }
});