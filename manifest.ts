import { Manifest } from "deno-slack-sdk/mod.ts";
import { WeatherFunctionDefinition } from "./functions/weather_function.ts";

export default Manifest({
  name: "mj-weather-function", //TODO
  description: "A template for building standalone functions in Slack",
  icon: "assets/default_new_app_icon.png",
  workflows: [],
  functions: [WeatherFunctionDefinition],
  outgoingDomains: ["api.openweathermap.org"],
  datastores: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
