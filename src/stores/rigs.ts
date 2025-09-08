import { atom } from "nanostores";
import { rigs as mockData } from "../data/db";
import type { Rig } from "../types";

export const rigs = atom<Rig[]>(mockData);

export function addRig(rig: Omit<Rig, "id">) {
  rigs.set([...rigs.get(), { id: Date.now(), ...rig }]);
}

export function deleteRig(id: number) {
  rigs.set(rigs.get().filter(r => r.id !== id));
}

export function updateRig(id: number, updatedRig: Partial<Rig>) {
  rigs.set(
    rigs.get().map(r => (r.id === id ? { ...r, ...updatedRig } : r))
  );
}