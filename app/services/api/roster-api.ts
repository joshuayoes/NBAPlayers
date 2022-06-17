import { ApiResponse } from "apisauce"
import { Api, ApiResult } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { Roster } from "../../models"

const API_PAGE_SIZE = 50

const BASE_URL = 'https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master'

export const rosterIds = [
    '2020-21.NBA.Roster.json'
] as const;

export type RosterId = typeof rosterIds[number]

export class RosterApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getRoster(id: RosterId): Promise<ApiResult<Roster>> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `${BASE_URL}/${id}`,
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data: Roster = { 
        id, 
        startingSeason: response.data.startingSeason,
        players: response.data.players,
        teams: response.data.teams,
      }

      return { kind: "ok", data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
