import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const WeatherFunctionDefinition = DefineFunction({
  callback_id: "weather_function",
  title: "Weather Function",
  description: "A weather function",
  source_file: "functions/weather_function.ts",
  input_parameters: {
    properties: {
      location: {
        type: Schema.types.string,
        description: "The location from the form",
      },
    },
    required: ["location"],
  },
  output_parameters: {
    properties: {
      weather_result: {
        type: Schema.types.string,
        description: "Message that was sent",
      },
    },
    required: ["weather_result"],
  },
});

export default SlackFunction(
  WeatherFunctionDefinition,
  async ({ inputs, env }) => {
    const location = inputs.location;

    const api_key = env.OPEN_WEATHER_MAP_API_KEY;

    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`, //TODO
    );

    const weather_json = await resp.json();
    console.log(weather_json);

    const weather_result = weather_json.weather[0].description;
    return { outputs: { weather_result } };
  },
);
