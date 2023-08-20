import global from '../global';
import window from '../window';

import doreamon from '../index';

export function toGlobal(name = 'doreamon') {
  global[name] = doreamon;
}

export function toWindow(name = 'doreamon') {
  window[name] = doreamon;
}

export default {
  toGlobal,
  toWindow,
};
