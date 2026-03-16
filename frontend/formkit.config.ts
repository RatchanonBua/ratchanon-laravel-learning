import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";

export default defaultConfig({
  config: {
    rootClasses: (sectionKey, node) => {
      return {
        [`formkit-${sectionKey}`]: true,
        "font-prompt": true,
      };
    },
  },
});
