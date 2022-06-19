import React, { useEffect } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { Team, useStores } from "../../models"
import { Player } from "../../models"
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
const PlayerCard = ({ player, team }: { player: Player; team: Team }) => {
  const teamName = team?.name ?? "Unsigned"
  const playerName = player?.name ?? "Unknown Player"

  return (
    <View style={PLAYER_CONTAINER}>
      <Image source={{ uri: player.imgURL }} style={IMAGE} />
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
