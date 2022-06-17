import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const TeamModel = types
  .model("Team")
  .props({
    tid: types.identifierNumber,
    name: types.string,
  })

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type TeamType = Instance<typeof TeamModel>
export interface Team extends TeamType {}
type TeamSnapshotType = SnapshotOut<typeof TeamModel>
export interface TeamSnapshot extends TeamSnapshotType {}
export const createTeamDefaultModel = () => types.optional(TeamModel, {})
