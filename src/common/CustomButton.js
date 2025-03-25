import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  style, 
  textStyle, 
  variant = "primary" // "primary" for solid, "outline" for transparent
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "outline" ? styles.outlineButton : styles.primaryButton,
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text 
        style={[
          styles.buttonText,
          variant === "outline" ? styles.outlineText : {},
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 10,
    borderWidth: 2, // For outline effect
  },
  primaryButton: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderColor: "#007BFF",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  outlineText: {
    color: "#007BFF",
  },
});

export default CustomButton;
