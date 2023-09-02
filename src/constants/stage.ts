const COOP_STAGE_KEYS: { [key: string]: number } = {
  "0e05d4caa34089a447535708370286f4ee6068661359b4d7cf6c319863424f84": 8,
  "1a29476c1ab5fdbc813e2df99cd290ce56dfe29755b97f671a7250e5f77f4961": 6,
  "2276a46e42a11637776ebc15cf2d46a589f1dba34a76d5c940c418ed7371d071": 100,
  "3418d2d89ef84288c78915b9acb63b4ad48df7bfcb48c27d6597920787e147ec": 2,
  "3598b7f54248b84c47cde6b99aa45ff296a41d3d5f38eaccfe2327b2874fff0b": 102,
  "5894ed09915957be54e5b1eb58c4c52a9d5d89a99b1297e6d06eac07d47196d0": 104,
  "630d89698e3e260ef12cb2a32e1cb2c4c83c0e58fc882762da1fa2cea19a5260": 4,
  "71c7076fc2d23f1833c923747e8582e29eb275bed96d8360aa5d0ed6ae069230": 103,
  be584c7c7f547b8cbac318617f646680541f88071bc71db73cd461eb3ea6326e: 1,
  f1e4df4cff1dc5e0acc66a9654fecf949224f7e4f6bd36305d4600ac3fa3db7b: 7,
  ffa84f05a6437395a0a128cad1a99e8dd0f303ce4fd687fa648617a0075d7ad9: -1,
};

const CoopStageKey = (id: number): string => {
  return Object.keys(COOP_STAGE_KEYS)[Object.values(COOP_STAGE_KEYS).indexOf(id)];
};

export const CoopStageTitle = (id: number): string => {
  return CoopStageKey(id);
};

export const CoopStageURL = (id: number): string => {
  return `/assets/stages/${CoopStageKey(id)}.webp`;
};

export const CoopStageLazyURL = (id: number): string => {
  return "/assets/stages/ffa84f05a6437395a0a128cad1a99e8dd0f303ce4fd687fa648617a0075d7ad9.webp";
};
