import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import UserScreen from "../../../users/appication/screen/usersScreen";

type Props = {
  navigation: any,
}

const HomePage: React.FC<Props> = ({ navigation }) => {
  const navigateToUsers = () => {
    navigation.navigate('UsersScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartDeviceSolutions</Text>
      <Text style={styles.subtitle}>
        Generador de órdenes para mantenimiento y reparación de dispositivos
      </Text>
      <Image
        source={{
          uri: "https://www.eshittu.com/es/images/reparacion-electronica-general.png",
        }}
        style={styles.coverImage}
      />

      <Card.Actions style={styles.cardActions}>
        <View style={styles.column}>
          <Button
           style={styles.button}
            icon="home"
            mode="contained"
            buttonColor="#1976D2"
            onPress={navigateToUsers}
          >
            Iniciar
          </Button>
        </View>
      </Card.Actions>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -60,
  },
  coverImage: {
    marginTop: 50,
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginTop: 8,
    textAlign: "center",
  },
  cardActions: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    alignItems: "center",
    marginRight: 10,
  },
  button: {
    width: 200,
    marginBottom: 50,
  },
});

export default HomePage;
