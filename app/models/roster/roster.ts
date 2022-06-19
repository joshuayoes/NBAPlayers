import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlayerModel } from "../player/player"
import { TeamModel } from "../team/team"

export const RosterModel = types.model("Roster").props({
  id: types.identifier,
  startingSeason: types.number,
  players: types.array(PlayerModel),
  teams: types.array(TeamModel),
})

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type RosterType = Instance<typeof RosterModel>
export interface Roster extends RosterType {}
type RosterSnapshotType = SnapshotOut<typeof RosterModel>
export interface RosterSnapshot extends RosterSnapshotType {}
export const createRosterDefaultModel = () => types.optional(RosterModel, {})
