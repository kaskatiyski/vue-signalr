import { App } from "vue";
import { VueSignalRConfig } from "./models";
import { createService } from "./service";
import { SignalRSymbol } from "./symbols";

export const VueSignalR = {
  install(app: App, options: VueSignalRConfig) {
    const service = createService(options);

    app.provide(SignalRSymbol, service);

    // "??" syntax isn't transpiled by TS due to esnext target
    // and would break projects using the package
    // Default autoConnect to true if not explicitly set
    const autoConnect = options.autoConnect !== false;

    if (autoConnect) {
      void service.init();
    }
  },
};
