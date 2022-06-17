import { RosterStoreModel } from "./roster-store"

test("can be created", () => {
  const instance = RosterStoreModel.create({})

  expect(instance).toBeTruthy()
})
