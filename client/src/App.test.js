import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./setupTests";
import { shallow } from "enzyme";
import sinon from "sinon";

it("renders without crashing", () => {
  shallow(<App />);
});

it("fetches London temperature without crashing", () => {
  const wrapper = shallow(<App />);
  const button = wrapper.find("#submitButton");
  const input = wrapper.find("#textInput");
  input.simulate("change", {
    target: {
      value: "London"
    }
  });
  button.simulate("click");
  setTimeout(() => {
    wrapper.update();
    expect(
      wrapper
        .find("#cityName")
        .text()
        .toEqual("London, uk")
    );
    wrapper.unmount();
    done();
  }, 2000);
});
