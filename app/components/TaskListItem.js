import React from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../config/colors";
import AppText from "./AppText";
import TaskListIcon from "./TaskListIcon";

function TaskListItem({
  image,
  ImageComponent,
  name,
  created_on,
  employeeCode,
  project,
  customer,
  anies,
  onPress,
  renderRightActions,
  title,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight
          style={styles.listContainer}
          onPress={onPress}
          underlayColor={colors.lightGreen}
        >
          <View style={styles.innerContainer}>
            {ImageComponent}
            {image && <Image style={styles.image} source={image} />}
            {created_on && <AppText style={styles.date}>{created_on}</AppText>}
            {employeeCode && (
              <AppText style={styles.assignee}>
                <TaskListIcon
                  name="map-marker-outline"
                  iconColor={colors.blue}
                />
                {employeeCode}
              </AppText>
            )}

            {project && (
              <AppText style={styles.project}>
                <TaskListIcon name="login-variant" />
                {project}
              </AppText>
            )}
            {customer && (
              <AppText style={styles.customer}>
                <TaskListIcon name="logout-variant" iconColor={colors.red} />
                {customer}
              </AppText>
            )}
            {anies && (
              <AppText style={styles.assignee}>
                <TaskListIcon
                  name="timer-outline"
                  iconColor={colors.secondary}
                />
                {anies}
              </AppText>
            )}
            <AppText style={styles.itemTitle}>{title}</AppText>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 7,
    height: 80,
    justifyContent: "center",
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

  assignee: {
    color: colors.darkGrey,
  },

  date: {
    fontWeight: "bold",
    color: colors.black,
    paddingLeft: 5,
  },

  itemTitle: {
    fontWeight: "bold",
    color: colors.black,
    paddingLeft: 5,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
});

export default TaskListItem;
