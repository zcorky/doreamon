import global from './global';
import window from './window';

import logger from './logger';
import debug from './debug';

import request from './request';
import date from './date';
import qs from './qs';
import event from './event';
import cookie from './cookie';
import fs from './fs';

import dom from './dom';
import url from './url';

// browser
import storage from './storage';
import device from './device';

import delay from './delay';
import uuid from './uuid';
import random from './random';
import is from './is';

import i18n from './i18n';

import ms from './ms';

import immer from './immer';

import classnames from './classnames';

import match from './match';

import hotkeys from './hotkeys';

import noop from './noop';

import * as type from './type';

const gloablStore =
  global.__DOREAMON_REGISTRY__ || (global.__DOREAMON_REGISTRY__ = {});

export interface IDoreamon {
  global: typeof global;
  window: typeof window;

  logger: typeof logger;
  debug: typeof debug;

  is: typeof is;
  type: typeof type;

  date: typeof date;
  event: typeof event;
  delay: typeof delay;
  uuid: typeof uuid;
  random: typeof random;

  ms: typeof ms;

  qs: typeof qs;
  url: typeof url;
  cookie: typeof cookie;
  request: typeof request;

  device: typeof device;

  storage: typeof storage;
  fs: typeof fs;

  dom: typeof dom;

  register: typeof register;
  get: typeof get;

  /** Depreciated */
  use: typeof register;

  // @depreciated
  object: typeof type.object;
  array: typeof type.array;
  string: typeof type.string;
  func: typeof type.func;

  // immer
  immer: typeof immer;

  // classnames
  classnames: typeof classnames;

  // match patterns
  match: typeof match;

  // hotkeys
  hotkeys: typeof hotkeys;

  // noop
  noop: typeof noop;

  [key: string]: any;
}

function register<T = any>(key: string, value: T) {
  if (gloablStore[key]) {
    throw new Error(`Doreamon cannot override ${key}`);
  }

  gloablStore[key] = value;
}

function get<T = any>(key: string): T {
  if (!gloablStore[key]) {
    throw new Error(`Doreamon cannot found ${key}`);
  }

  return gloablStore[key];
}

const use = register;

export const doreamon: IDoreamon = {
  global,
  window,

  logger,
  debug,

  is,
  type,

  date,
  event,
  delay,
  uuid,
  random,

  ms,

  qs,
  url,
  cookie,
  request,

  device,

  storage,
  fs,

  i18n,

  dom,

  //
  register,
  get,
  use,

  // @depreciated
  object: type.object,
  array: type.array,
  string: type.string,
  func: type.func,

  // immer
  immer,

  // classnames
  classnames,

  // match patterns
  match,

  // hotkeys
  hotkeys,

  noop,
};

export default doreamon;
