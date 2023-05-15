import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import AppButton from "./app-button.vue";

const acceptedProps = {
  color: ["primary", "secondary", "transparent", "danger", "success"],
  variant: ["outlined", "filled", "text"],
  size: ["sm", "md", "xl"],
};
const checkProps = (props: any): boolean => {
  return Object.entries(props).some(
    ([key, value]) =>
      !acceptedProps[key as keyof typeof acceptedProps].includes(
        value as string
      )
  );
};
let wrapper: VueWrapper | null;
beforeEach(() => {
  wrapper = mount(AppButton, { slots: { default: "my button" } });
});
describe("app button", () => {
  it("app button should rendered", () => {
    expect(wrapper?.text()).toBe("my button");
  });
  it("app button pass props", async () => {
    await wrapper?.setProps({
      color: "primary",
      size: "sm",
      variant: "filled",
      disabled: true,
    });
    expect(wrapper?.props()).toEqual({
      color: "primary",
      size: "sm",
      variant: "filled",
      disabled: true,
    });
  });
  it("app button pass wrong props", async () => {
    await wrapper?.setProps({
      color: "red",
      size: "large",
      variant: "different",
      disabled: true,
    });
    expect(checkProps(wrapper?.props())).toBeTruthy();
  });
  it("check button unmount", () => {
    wrapper?.unmount();
    expect(wrapper?.exists()).toBeFalsy();
  });
});
