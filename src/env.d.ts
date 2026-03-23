/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: import('better-auth').User | null
    session: import('better-auth').Session | null
  }
}

interface Window {
  SnipcartSettings: {
    publicApiKey: string
    loadStrategy?: 'on-user-interaction' | 'immediate'
    modalStyle?: 'side' | 'full'
    addProductBehavior?: 'none' | 'show'
    [key: string]: any
  }
  Snipcart: any
}
