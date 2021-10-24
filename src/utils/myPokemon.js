import { localStorageKey } from "./constant";

export function getMyPokemon() {
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem(localStorageKey) === null) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ owned_pokemon: [] })
      );
    }
    return JSON.parse(localStorage.getItem(localStorageKey));
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
    return { owned_pokemon: [] };
  }
}

export function updateMyPokemon(data) {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ owned_pokemon: data })
    );
    return true;
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
    return false;
  }
}
