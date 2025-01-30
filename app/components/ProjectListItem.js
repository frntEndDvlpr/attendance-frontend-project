import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";
import ListItemSeparator from "./ListItemSeparator";

function ProjectListItem({
  title,
  description,
  start_date,
  end_date,
  client,
  location,
  range,
  renderRightActions,
  onPress,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress} underlayColor={colors.lightGrey}>
          <View style={styles.container}>
            <View style={styles.title}>
              <AppText style={styles.titleText}>{title}</AppText>
              <AppText>{description}</AppText>
            </View>
            <View style={styles.date}>
              {start_date && (
                <AppText style={styles.dateText}>
                  <MaterialCommunityIcons
                    name="calendar-start"
                    size={20}
                    color={colors.primary}
                  />
                  {start_date}
                </AppText>
              )}
              {end_date && (
                <AppText>
                  <MaterialCommunityIcons
                    name="calendar-end"
                    size={20}
                    color={colors.danger}
                  />
                  {end_date}
                </AppText>
              )}
            </View>
            <View style={styles.location}>
              {location && (
                <AppText style={styles.titleText}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={20}
                    color={colors.blue}
                  />
                  {location}
                </AppText>
              )}
              {range !== undefined && (
                <AppText>
                  <MaterialCommunityIcons
                    name="map-marker-circle"
                    size={20}
                    color={colors.secondary}
                  />
                  {range.toString()}
                </AppText>
              )}
            </View>
            {client && <AppText>{client}</AppText>}
          </View>
        </TouchableHighlight>
        <ListItemSeparator />
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: { flexDirection: "row" },
  date: { flexDirection: "row", marginVertical: 5 },
  location: { flexDirection: "row" },
  titleText: { color: colors.black, fontWeight: "bold", paddingRight: 10 },
  dateText: { paddingRight: 10, color: colors.black },
});

export default ProjectListItem;
