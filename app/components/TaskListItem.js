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
  title,
  date,
  assignee,
  project,
  customer,
  anies,
  onPress,
  renderRightActions,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress} underlayColor={colors.lightGreen}>
          <View style={styles.listContainer}>
            {ImageComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.listDetailsContainer}>
              {date && <AppText style={styles.date}>{date}</AppText>}
              <View style={styles.innerContainer}>
                {assignee && (
                  <AppText style={styles.assignee}>
                    <TaskListIcon
                      name="map-marker-outline"
                      iconColor={colors.blue}
                    />
                    {assignee}
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
                    <TaskListIcon
                      name="logout-variant"
                      iconColor={colors.red}
                    />
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
              </View>
              <View>
                <AppText style={styles.itemTitle}>{title}</AppText>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  assignee: {
    color: colors.darkGrey,
  },
  customer: {},
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontWeight: "bold",
    color: colors.black,
  },
  itemTitle: {
    fontWeight: "bold",
    color: colors.black,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  listContainer: {},
  listDetailsContainer: {
    marginHorizontal: 15,
    height: 80,
    justifyContent: "flex-end",
  },
  project: {},
});

export default TaskListItem;
