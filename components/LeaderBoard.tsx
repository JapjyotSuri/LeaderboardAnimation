import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
} from "react";
import Animated, {
  FadeInRight,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import index from "@/app";

const users = [
  { name: "japjyot", score: 25 },
  { name: "arjun", score: 30 },
  { name: "simran", score: 40 },
  { name: "rahul", score: 20 },
  { name: "ananya", score: 35 },
];
type PlaceProps = {
  item: (typeof users)[0];
  index: number;
  onFinish: (index: number) => void;
  anim: SharedValue<number>;
};

//all constants

const _avatarSize = 30;
const spacing = 4;
const _stagger = 100;
function Place({ item, index, onFinish, anim }: PlaceProps) {
  const animVal = useDerivedValue(() => {
    //useDerived value creates a new read only value from an existing useSharedValue
    return withDelay(
      _stagger * index,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200,
      })
    );
    const animatedStylesPlace = useAnimatedStyle(() => {
      return {
        height: interpolate(animVal.value, [0, 1], [0, item.score * 3]),
      };
    });
  });
  return (
    <Animated.View
      entering={FadeInRight.delay(_stagger * index)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback(() => {
          runOnJS(onFinish)(index);
        })}
    >
      <Image
        source={{
          uri: `https://api.dicebear.com/6.x/bottts/png?seed=${item.name}`,
        }}
        style={{
          height: _avatarSize,
          borderRadius: _avatarSize,
          padding: 1,
          width: _avatarSize,
          backgroundColor: "blue",
        }}
      />
      <Text>
        {item.name} : {item.score}
      </Text>
    </Animated.View>
  );
}
const LeaderBoard = () => {
  const anim = useSharedValue(0);
  function onFinish(index: number) {
    if (index === users.length - 1) {
      console.log("list has finished");
    }
  }
  return (
    <View style={{ flexDirection: "row", gap: spacing }}>
      {users.map((item, index) => (
        <Place item={item} index={index} onFinish={onFinish} anim={anim} />
      ))}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({});
