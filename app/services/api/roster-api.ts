import { ApiResponse } from "apisauce"
import { Api, ApiResult } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { Roster } from "../../models"

const BASE_URL = "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master"

export const rosterIds = [
  "1995-96.NBA.Roster.json",
  "2015-16.NBA.Roster.json",
  "2016-17.NBA.Roster.json",
  "2017-18.NBA.Roster.json",
  "2018-19.NBA.Roster.json",
  "2019-20.NBA.Roster.json",
  "2020-21.NBA.Roster.json",
  "2021-22.NBA.Roster.json",
  // "2022-23.NBA.Roster.json" // would have added, but JSON file has invalid character
] as const

export type RosterId = typeof rosterIds[number]

export interface RosterEntry<Id extends RosterId = RosterId> {
  id: Id
  name: string
}

const idToName = (id: RosterId) => id.replace(".json", "").split(".").join(" ")
export const rosterEntries: RosterEntry[] = rosterIds.map((id) => ({ id, name: idToName(id) }))

export class RosterApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getRoster(id: RosterId): Promise<ApiResult<Roster>> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`${BASE_URL}/${id}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data: Roster = {
        id,
        players: response?.data?.players,
        teams: response?.data?.teams,
      }

      return { kind: "ok", data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
