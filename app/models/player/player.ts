import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NO_TEAM_ID } from "../team/team"

export const PlayerModel = types.model("Player").props({
  name: types.maybe(types.string),
  imgURL: types.maybe(types.string),
  tid: types.optional(types.number, NO_TEAM_ID),
})

type PlayerType = Instance<typeof PlayerModel>
export interface Player extends PlayerType {}
type PlayerSnapshotType = SnapshotOut<typeof PlayerModel>
export interface PlayerSnapshot extends PlayerSnapshotType {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
