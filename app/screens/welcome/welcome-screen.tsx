import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  padding: spacing[4],
  justifyContent: 'center',
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TITLE_CONTAINER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ROSTER_BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const ROSTER_BUTTON_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const ROSTER_CONTAINER: ViewStyle = {
  marginVertical: spacing[4]
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("playerList")

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <View style={TITLE_CONTAINER}>
          <Text style={TITLE} text="NBA Players" />
        </View>
        <View style={ROSTER_CONTAINER}>
          <Button
            testID="next-screen-button"
            style={ROSTER_BUTTON}
            textStyle={ROSTER_BUTTON_TEXT}
            text="2020-21 NBA Roster"
            onPress={nextScreen}
          />
        </View>
      </Screen>
    </View>
  )
})
