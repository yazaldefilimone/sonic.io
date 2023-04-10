export type socketType<T = string> = {
  send(data: T): void;
};

export type optionType = { streams?: boolean; cache?: boolean };

export type toType = {
  room: string;
  options?: optionType;
};

export type emitFunctionType<T = any> = (event: string, data: T, options?: optionType) => Promise<void>;

export type emitResponseType = {
  emit: emitFunctionType;
};
