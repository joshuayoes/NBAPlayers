import { TeamModel } from "./team"

test("can be created", () => {
  const instance = TeamModel.create({})

  expect(instance).toBeTruthy()
})
