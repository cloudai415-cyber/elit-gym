"use client"

import { useSyncExternalStore } from "react"
import type { Lang, Profile } from "./types"

const PROFILE_KEY = "elit-gym:profile"
const LANG_KEY = "elit-gym:lang"

interface StoreState {
  hydrated: boolean
  lang: Lang
  profile: Profile | null
}

const serverState: StoreState = { hydrated: false, lang: "en", profile: null }
let state: StoreState = serverState
const listeners = new Set<() => void>()

function isLang(value: unknown): value is Lang {
  return value === "en" || value === "ru" || value === "uz"
}

function readProfile(): Profile | null {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Profile
    return parsed && typeof parsed.name === "string" ? parsed : null
  } catch {
    return null
  }
}

function hydrate() {
  if (state.hydrated || typeof window === "undefined") return
  const profile = readProfile()
  const storedLang = window.localStorage.getItem(LANG_KEY)
  const browserLang = navigator.language.slice(0, 2)
  const lang: Lang = profile?.language ?? (isLang(storedLang) ? storedLang : isLang(browserLang) ? browserLang : "en")
  state = { hydrated: true, lang, profile }
}

function setState(next: Partial<StoreState>) {
  state = { ...state, ...next }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  hydrate()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAppStore(): StoreState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => serverState,
  )
}

export function setLang(lang: Lang) {
  window.localStorage.setItem(LANG_KEY, lang)
  const profile = state.profile ? { ...state.profile, language: lang } : null
  if (profile) window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  setState({ lang, profile })
}

export function saveProfile(profile: Profile) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  window.localStorage.setItem(LANG_KEY, profile.language)
  setState({ profile, lang: profile.language })
}

export function clearProfile() {
  window.localStorage.removeItem(PROFILE_KEY)
  setState({ profile: null })
}
