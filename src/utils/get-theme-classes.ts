import type { Colors, ComponentNames, Sizes, Variants } from "types/theme";
export type Modification = Colors | Sizes | Variants;

const getComponentClassByModifications = (
  componentName: ComponentNames,
  modification: Modification,
  prefix?: string
) => {
  if (prefix) {
    return {
      [modification]: `${componentName}__${prefix}--${modification}`,
    };
  }
  return {
    [modification]: `${componentName}--${modification}`,
  };
};

export const getComponentClasses = (
  componentName: ComponentNames,
  modifications: Modification[],
  prefix?: string
) => {
  return modifications.reduce(
    (acc, modification) =>
      `${acc} ${
        getComponentClassByModifications(componentName, modification, prefix)[
          modification
        ]
      }`,
    ""
  );
};
