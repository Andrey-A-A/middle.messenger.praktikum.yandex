declare module '*.svg' {
  const value: HTMLElement & SVGElement;
  export = value;
}
declare module '*.png' {
  const value: HTMLImageElement;
  export = value;
}