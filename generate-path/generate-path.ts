import { generatePath as reactRouterGeneratePath } from "react-router-dom";

import { PathArgs } from "./generate-path.types";

/**
 * TO DO: docs
 * @param path string
 * @param params
 * @returns generatePath of `react-router`, applying `path` and `params` given as arguments
 */
const generatePath = <Path extends string>(path: Path, params: PathArgs<Path>) =>
  reactRouterGeneratePath(path, params);

export default generatePath;