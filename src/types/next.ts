export type ExportedNextConfig = Partial<NextConfigObject> | NextConfigFunction;

export type NextConfigObject = {
  env: Record<string, string>;
} & {
  [key: string]: unknown;
};

export type NextConfigFunction = (
  phase: string,
  defaults: { defaultConfig: NextConfigObject },
) => Partial<NextConfigObject>;
