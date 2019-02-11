import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./setUpTests";
import { shallow } from "enzyme";
import sinon from "sinon";

it("renders without crashing", () => {
  shallow(<App />);
});

it("fetches London temperature without crashing", done => {
  const wrapper = shallow(<App />);
  const button = wrapper.find("#submitButton");
  const input = wrapper.find("#textInput");
  input.simulate("change", {
    target: {
      value: "Shenzhen"
    }
  });
  button.simulate("click");
  //jest.useFakeTimers();
  setTimeout(() => {
    wrapper.update();
    expect(wrapper.find("#cityName").text()).toEqual("Shenzhen CN");
    done();
  }, 2000);
  //jest.runAllTimers();
});
