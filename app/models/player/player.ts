import { Instance, SnapshotOut, types } from "mobx-state-tree"
import uuid from "react-native-uuid"

import { NO_TEAM_ID } from "../team/team"

const createId = (): string => {
  const id = uuid.v4()
  return typeof id === "string" ? id : String(id[0])
}

export const PlayerModel = types.model("Player").props({
  id: types.optional(types.identifier, createId),
  name: types.maybe(types.string),
  imgURL: types.maybe(types.string),
  tid: types.optional(types.number, NO_TEAM_ID),
})

type PlayerType = Instance<typeof PlayerModel>
export interface Player extends PlayerType {}
type PlayerSnapshotType = SnapshotOut<typeof PlayerModel>
export interface PlayerSnapshot extends PlayerSnapshotType {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
