import * as React from "react"
import { Text } from "react-native"
import renderer from "react-test-renderer"

import { ThemedText } from "../ThemedText"

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <ThemedText>
        <Text>Snapshot test!</Text>
      </ThemedText>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
