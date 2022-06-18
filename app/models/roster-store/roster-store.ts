import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RosterApi, RosterId } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"
import { Player } from "../player/player"
import { Roster, RosterModel } from '../roster/roster'
import { Team } from "../team/team"


/**
 * Model description here for TypeScript hints.
 */
export const RosterStoreModel = types
  .model("RosterStore")
  .props({
    rosters: types.map(RosterModel),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setRosterById: (id: RosterId, roster: Roster) => {
      const update = self.rosters.set(id, roster)
      self.rosters.replace(update)
    }
  }))
  .actions((self) => ({
    fetchRosterById: async (id: RosterId) => {
      const api = new RosterApi(self.environment.api)
      const result = await api.getRoster(id)

      if (result.kind === "ok") {
        self.setRosterById(id, result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))
  .views((self) => ({
    getPlayersByRosterId: (id: RosterId): Player[] => {
      const roster = self.rosters.get(id)
      return roster?.players ?? []
    },
    getTeamsByRosterId: (id: RosterId): Team[] => {
      const roster = self.rosters.get(id)
      return roster?.teams ?? []
    }
  }))
  .views((self) => ({
    getTeamByTid: (id: RosterId, tid: Team['tid']): Team | undefined => {
      const teams = self.getTeamsByRosterId(id)
      return teams.find(team => team.tid === tid)
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type RosterStoreType = Instance<typeof RosterStoreModel>
export interface RosterStore extends RosterStoreType {}
type RosterStoreSnapshotType = SnapshotOut<typeof RosterStoreModel>
export interface RosterStoreSnapshot extends RosterStoreSnapshotType {}
export const createRosterStoreDefaultModel = () => types.optional(RosterStoreModel, {})
