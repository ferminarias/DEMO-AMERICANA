// Shims mínimos para el entorno de linter/editor

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

declare module "react" {
  const React: any
  export default React
  export const useState: any
  export const useEffect: any
  export const useRef: any
  export type ReactNode = any
  export type ChangeEvent<T = any> = any
  export type KeyboardEvent<T = any> = any
}

declare const process: {
  env?: Record<string, string | undefined>
}

declare module "@elevenlabs/client" {
  export const Conversation: any
}


