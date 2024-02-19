import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

const RenderMasonryList = ({ gif, photo, navigation }) => {
  const oddItems = gif.filter((_, index) => index % 2 !== 0);
  const evenItems = gif.filter((_, index) => index % 2 === 0);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {oddItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={navigation}
            >
              <View style={[styles.card, { height: 150 }]}>
                <Image source={item.image} style={styles.image} />
              </View>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardTextSmall}>{item.totalData}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          {evenItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.cardContainer}>
              <View style={[styles.card, { height: 150 }]}>
                <Image source={item.image} style={styles.image} />
              </View>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardTextSmall}>{item.totalData}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  cardContainer: {
    marginBottom: 8,
  },
  cardText: {
    marginLeft: 16,
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  cardTextSmall: {
    marginLeft: 16,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
});

export default RenderMasonryList;
