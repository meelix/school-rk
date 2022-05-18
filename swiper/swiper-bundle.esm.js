/**
 * Swiper 8.1.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 11, 2022
 */

import Swiper from './core/core.js';
export { default as Swiper, default } from './core/core.js';
import Virtual from './modules/virtual/virtual.js';
import Navigation from './modules/navigation/navigation.js';
import Pagination from './modules/pagination/pagination.js';
import Controller from './modules/controller/controller.js';
import A11y from './modules/a11y/a11y.js';
import Manipulation from './modules/manipulation/manipulation.js';

// Swiper Class
const modules = [Virtual, Navigation, Pagination, Controller, A11y, Manipulation];
Swiper.use(modules);
