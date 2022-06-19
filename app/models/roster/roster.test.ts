import { RosterModel } from "./roster"

test("can be created", () => {
  const instance = RosterModel.create({})

  expect(instance).toBeTruthy()
})
