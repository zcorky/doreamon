import * as hotkeys from 'is-hotkey';

export interface KeyboardEventLike {
  key: string;
  which: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export function isHotkey(
  hotkey: string | ReadonlyArray<string>,
  event: KeyboardEventLike,
): boolean {
  return hotkeys.isHotkey(hotkey, event);
}

export default {
  isHotkey,
};
