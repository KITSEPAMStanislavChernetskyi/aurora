import React from "react";
import renderer from "react-test-renderer";

import Tooltip from "../Tooltip";

describe("Tooltip", () => {
  it("should match snapshot", () => {
    const tree = renderer
      .create(
        <Tooltip
          isVisible
          onEnter={() => {}}
          variant="light"
          direction="top"
          arrowAdjustment={40}
        >
          test
        </Tooltip>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
