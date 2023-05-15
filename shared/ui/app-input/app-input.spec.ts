import { expect, it, describe, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import AppInput from "./app-input.vue";

let wrapper: null | VueWrapper;
beforeEach(() => {
  wrapper = mount(AppInput, { props: {} });
});
describe("app input", () => {
  it("app input should be render", () => {
    expect(wrapper?.exists()).toBeTruthy();
  });
  it("app input change value", async () => {
    await wrapper?.setProps({
      value: "",
      "onUpdate:value": (value: string) => wrapper?.setProps({ value }),
    });
    await wrapper?.find("input").setValue("test");
    expect(wrapper?.props("value")).toBe("test");
  });
});
