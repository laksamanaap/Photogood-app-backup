import React, { forwardRef } from "react";
import { ScrollView, Text } from "react-native";
import BottomSheet from "@devvie/bottom-sheet";

const BottomSheetUI = forwardRef(({ height, id }, ref) => {
  return (
    <BottomSheet ref={ref} height={height}>
      <ScrollView>
        <Text>{id} laksa</Text>
      </ScrollView>
    </BottomSheet>
  );
});

export default BottomSheetUI;
