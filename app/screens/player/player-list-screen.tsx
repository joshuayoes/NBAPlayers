import React, { useEffect, useState } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { Team, useStores, Player } from "../../models"

import { PlayerListScreenProps } from "../../navigators"

// #region Styles
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const PLAYER_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
  justifyContent: "flex-start",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const PLAYER_TEXT_CONTAINER: ViewStyle = {
  padding: 10,
  height: "100%",
  alignContent: "space-between",
  flexWrap: "wrap",
  flexDirection: "column",
}
const PLAYER_TEXT: TextStyle = {
  ...TEXT,
  color: color.palette.white,
  paddingBottom: 5,
}
const TEAM_TEXT: TextStyle = {
  ...TEXT,
  color: color.palette.offWhite,
  fontSize: 15,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
// #endregion

// #region Components
const PlayerIcon = ({ player }: { player: Player }) => {
  const backupUri =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADRukGaAAAACXBIWXMAAAsTAAALEwEAmpwYAAACC0lEQVRIDcWU4XHiMBCFceb+xyW4BF8FOBXcdUBSAVwFdgfQAaQCSAVKKiAdyB2Eq4B8z0hGFjLH/cjkzbzZ1du3K0v2eDL5YmT/mn88Hks8U6hYQOEAX+FLlmUt8f/B4Aoa6GFJjOOe6GFItPntoGHpui2xgXncjVbAR2ihUMee5BrjWm6wgheDU0349BDCOlXvNQy1XKDpRZegzeEWGjhL1P0my7jWrWkqodDEBjR/54p9nvDp1EIV1yaIBtq4gKZ7Fha+prxTAk01tBxaaLy3iwgFFFJHN+j7QcNpmE6yS+gNulCqducMv118czEMh3AR5ffRWsuV0yoXu6Nt2fHiKWVAv7gOtDkULk7seiy1dbiBQRjeW1/tNulfLL4+DyyDVLP8PH9FA0O84HfwE+0J6rpauHAa6Q1gtw20N1hvsjBLp9zJ/MN1vBNniDlPpqccQDqCWLiCPO2IV54SPsMTGFBCoQk0fbo1tHAMetIVLIK+R2futCwo6CVrZ933HC6g8Ap38C9soZBDeaewgsIG/oH6GnW6B+IZ7Fq5nX1oSDToKvDopDqF8HEKI79vit64vTo1UaR36YY3ifJZwrRxxvqsjmd4c+iHb8adQYUGXY9g4QwWQblL0TS4hv5aVrHn6prGEhrosScxjpboYUiqsWH9VzRmoLmg9gtW0L/0lvwdvvG1KH4fPgH9CH0Q0G8VrAAAAABJRU5ErkJggg=="

  return <Image source={{ uri: player.imgURL }} defaultSource={{ uri: backupUri }} style={IMAGE} accessibilityLabel={player.name} />
}

const PlayerCard = ({ player, team }: { player: Player; team: Team }) => {
  const teamName = team?.name ?? "Unsigned"
  const playerName = player?.name ?? "Unknown Player"

  return (
    <View style={PLAYER_CONTAINER}>
      <PlayerIcon player={player} />
      <View style={PLAYER_TEXT_CONTAINER}>
        <Text style={PLAYER_TEXT}>{playerName}</Text>
        <Text style={TEAM_TEXT}>{teamName}</Text>
      </View>
    </View>
  )
}
// #endregion

export const PlayerListScreen = observer(function PlayerListScreen() {
  const navigation = useNavigation<PlayerListScreenProps["navigation"]>()
  const goBack = () => navigation.goBack()

  const {
    params: { id, name },
  } = useRoute<PlayerListScreenProps["route"]>()

  const { rosterStore } = useStores()
  const players = rosterStore.getPlayersByRosterId(id)

  useEffect(() => {
    async function fetchData() {
      await rosterStore.fetchRosterById(id)
    }

    fetchData()
  }, [])

  return (
    <View testID="PlayerListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText={name}
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={players}
          keyExtractor={(item, index) =>
            `${item.name ?? "name"}-${item.imgURL ?? "imgURL"}-${index}`
          }
          renderItem={({ item }) => {
            const team = rosterStore.getTeamByTid(id, item.tid)
            return <PlayerCard player={item} team={team} />
          }}
        />
      </Screen>
    </View>
  )
})
