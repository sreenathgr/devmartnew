import { rh, rw } from '@/utils/responsiveScreenMeasures';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type IconLibrary = any;

type ProfileListButtonProps = {
  LeftIconComponent: IconLibrary;
  leftIconName: string;
  leftIconColour: string;
  titleText: string;
  RightIconComponent: IconLibrary;
  rightIconName: string;
  rightIconColour: string;
};

const ProfileListButton = ({
  LeftIconComponent,
  leftIconName,
  leftIconColour,
  titleText,
  RightIconComponent,
  rightIconName,
  rightIconColour,
}: ProfileListButtonProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.leftIconViewStyle}>
          <LeftIconComponent
            name={leftIconName}
            size={18}
            color={leftIconColour}
          />
        </View>
        <View style={styles.titleTextView}>
          <Text style={styles.titleText}>{titleText}</Text>
        </View>
      </View>
      <View>
        <RightIconComponent
          name={rightIconName}
          size={24}
          color={rightIconColour}
        />
      </View>
    </View>
  );
};

export default ProfileListButton;

const styles = StyleSheet.create({
  titleText: { color: 'white', fontSize: 18 },
  titleTextView: { paddingStart: rw(2) },
  leftIconViewStyle: {
    backgroundColor: '#5F6B76',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: rw(2),
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  innerContainer: { flexDirection: 'row', alignItems: 'center' },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: rh(1),
    paddingHorizontal: rw(5),
  },
});
