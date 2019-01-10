/** 
* chroma.js - JavaScript library for color conversions
*
* Copyright (c) 2011-2018, Gregor Aisch
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* 2. Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following disclaimer in the documentation
* and/or other materials provided with the distribution.
*
* 3. The name Gregor Aisch may not be used to endorse or promote products
* derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
* INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
* BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
* OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
* NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
* EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* -------------------------------------------------------
*
* chroma.js includes colors from colorbrewer2.org, which are released under
* the following license:
*
* Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
* and The Pennsylvania State University.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
* either express or implied. See the License for the specific
* language governing permissions and limitations under the License.
*
* ------------------------------------------------------
*
* Named colors are taken from X11 Color Names.
* http://www.w3.org/TR/css3-color/#svg-color
*
* @preserve
*/

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global.chroma = factory());
}(this, (function () { 'use strict';

   var limit = function (x, min, max) {
           if ( min === void 0 ) min=0;
           if ( max === void 0 ) max=1;

           return x < min ? min : x > max ? max : x;
   };

   var clip_rgb = function (rgb) {
           rgb._clipped = false;
           rgb._unclipped = rgb.slice(0);
           for (var i=0; i<=3; i++) {
                   if (i < 3) {
                           if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                           rgb[i] = limit(rgb[i], 0, 255);
                   } else if (i === 3) {
                           rgb[i] = limit(rgb[i], 0, 1);
                   }
           }
           return rgb;
   };

   // ported from jQuery's $.type
   var classToType = {};
   for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
           var name = list[i];

           classToType[("[object " + name + "]")] = name.toLowerCase();
   }
   var type = function(obj) {
           return classToType[Object.prototype.toString.call(obj)] || "object";
   };

   var unpack = function (args, keyOrder) {
           if ( keyOrder === void 0 ) keyOrder=null;

       // if called with more than 3 arguments, we return the arguments
           if (args.length >= 3) { return Array.prototype.slice.call(args); }
           // with less than 3 args we check if first arg is object
           // and use the keyOrder string to extract and sort properties
       if (type(args[0]) == 'object' && keyOrder) {
           return keyOrder.split('')
               .filter(function (k) { return args[0][k] !== undefined; })
               .map(function (k) { return args[0][k]; });
       }
       // otherwise we just return the first argument
       // (which we suppose is an array of args)
           return args[0];
   };

   var last = function (args) {
           if (args.length < 2) { return null; }
           var l = args.length-1;
           if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
           return null;
   };

   var PI = Math.PI;

   var utils = {
       clip_rgb: clip_rgb,
       limit: limit,
       type: type,
       unpack: unpack,
       last: last,
       PI: PI,
       TWOPI: PI*2,
       PITHIRD: PI/3,
       DEG2RAD: PI / 180,
       RAD2DEG: 180 / PI
   };

   var input = {
       format: {},
       autodetect: []
   };

   var last$1 = utils.last;
   var clip_rgb$1 = utils.clip_rgb;
   var type$1 = utils.type;


   var Color = function Color() {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           var me = this;
           if (type$1(args[0]) === 'object' &&
                   args[0].constructor &&
                   args[0].constructor === this.constructor) {
                   // the argument is already a Color instance
                   return args[0];
           }

           // last argument could be the mode
           var mode = last$1(args);
           var autodetect = false;

           if (!mode) {
                   autodetect = true;
                   if (!input.sorted) {
                           input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
                           input.sorted = true;
                   }
                   // auto-detect format
                   for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
                           var chk = list[i];

                           mode = chk.test.apply(chk, args);
                           if (mode) { break; }
                   }
           }

           if (input.format[mode]) {
                   var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
                   me._rgb = clip_rgb$1(rgb);
           } else {
                   throw new Error('unknown format: '+args);
           }

           // add alpha channel
           if (me._rgb.length === 3) { me._rgb.push(1); }
   };

   Color.prototype.toString = function toString () {
           if (type$1(this.hex) == 'function') { return this.hex(); }
           return ("[" + (this._rgb.join(',')) + "]");
   };

   var Color_1 = Color;

   var chroma = function () {
       var args = [], len = arguments.length;
       while ( len-- ) args[ len ] = arguments[ len ];

       return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
   };

   chroma.Color = Color_1;
   chroma.version = '2.0.2';

   var chroma_1 = chroma;

   var unpack$1 = utils.unpack;
   var max = Math.max;

   var rgb2cmyk = function () {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           var ref = unpack$1(args, 'rgb');
           var r = ref[0];
           var g = ref[1];
           var b = ref[2];
           r = r / 255;
           g = g / 255;
           b = b / 255;
           var k = 1 - max(r,max(g,b));
           var f = k < 1 ? 1 / (1-k) : 0;
           var c = (1-r-k) * f;
           var m = (1-g-k) * f;
           var y = (1-b-k) * f;
           return [c,m,y,k];
   };

   var rgb2cmyk_1 = rgb2cmyk;

   var unpack$2 = utils.unpack;

   var cmyk2rgb = function () {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           args = unpack$2(args, 'cmyk');
           var c = args[0];
           var m = args[1];
           var y = args[2];
           var k = args[3];
           var alpha = args.length > 4 ? args[4] : 1;
           if (k === 1) { return [0,0,0,alpha]; }
           return [
                   c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
                   m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
                   y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
                   alpha
           ];
   };

   var cmyk2rgb_1 = cmyk2rgb;

   var unpack$3 = utils.unpack;
   var type$2 = utils.type;



   Color_1.prototype.cmyk = function() {
           return rgb2cmyk_1(this._rgb);
   };

   chroma_1.cmyk = function () {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
   };

   input.format.cmyk = cmyk2rgb_1;

   input.autodetect.push({
           p: 2,
           test: function () {
                   var args = [], len = arguments.length;
                   while ( len-- ) args[ len ] = arguments[ len ];

                   args = unpack$3(args, 'cmyk');
                   if (type$2(args) === 'array' && args.length === 4) {
                           return 'cmyk';
                   }
           }
   });

   var unpack$4 = utils.unpack;
   var last$2 = utils.last;
   var rnd = function (a) { return Math.round(a*100)/100; };

   /*
    * supported arguments:
    * - hsl2css(h,s,l)
    * - hsl2css(h,s,l,a)
    * - hsl2css([h,s,l], mode)
    * - hsl2css([h,s,l,a], mode)
    * - hsl2css({h,s,l,a}, mode)
    */
   var hsl2css = function () {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           var hsla = unpack$4(args, 'hsla');
           var mode = last$2(args) || 'lsa';
           hsla[0] = rnd(hsla[0] || 0);
           hsla[1] = rnd(hsla[1]*100) + '%';
           hsla[2] = rnd(hsla[2]*100) + '%';
           if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
                   hsla[3] = hsla.length > 3 ? hsla[3] : 1;
                   mode = 'hsla';
           } else {
                   hsla.length = 3;
           }
           return (mode + "(" + (hsla.join(',')) + ")");
   };

   var hsl2css_1 = hsl2css;

   var unpack$5 = utils.unpack;

   /*
    * supported arguments:
    * - rgb2hsl(r,g,b)
    * - rgb2hsl(r,g,b,a)
    * - rgb2hsl([r,g,b])
    * - rgb2hsl([r,g,b,a])
    * - rgb2hsl({r,g,b,a})
    */
   var rgb2hsl = function () {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           args = unpack$5(args, 'rgba');
           var r = args[0];
           var g = args[1];
           var b = args[2];

           r /= 255;
           g /= 255;
           b /= 255;

           var min = Math.min(r, g, b);
           var max = Math.max(r, g, b);

           var l = (max + min) / 2;
           var s, h;

           if (max === min){
                   s = 0;
                   h = Number.NaN;
           } else {
                   s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
           }

           if (r == max) { h = (g - b) / (max - min); }
           else if (g == max) { h = 2 + (b - r) / (max - min); }
           else if (b == max) { h = 4 + (r - g) / (max - min); }

           h *= 60;
           if (h < 0) { h += 360; }
           if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
           return [h,s,l];
   };

   var rgb2hsl_1 = rgb2hsl;

   var unpack$6 = utils.unpack;
   var last$3 = utils.last;


   var round = Math.round;

   /*
    * supported arguments:
    * - rgb2css(r,g,b)
    * - rgb2css(r,g,b,a)
    * - rgb2css([r,g,b], mode)
    * - rgb2css([r,g,b,a], mode)
    * - rgb2css({r,g,b,a}, mode)
    */
   var rgb2css = function () {
           var args = [], len = arguments.length;
           while ( len-- ) args[ len ] = arguments[ len ];

           var rgba = unpack$6(args, 'rgba');
           var mode = last$3(args) || 'rgb';
           if (mode.substr(0,3) == 'hsl') {
                   return hsl2css_1(rgb2hsl_1(rgba), mode);
           }
           rgba[0] = round(rgba[0]);
           rgba[1] = round(rgba[1]);
           rgba[2] = round(rgba[2]);
           if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
                   rgba[3] = rgba.length > 3 ? rgba[3] : 1;
                   mode = 'rgba';
           }
           return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
   };

   var rgb2css_1 = rgb2css;

   var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
   var RE_HEXA = /^#?([A-Fa-f0-9]{8})$/;

   var hex2rgb = function (hex) {
           if (hex.match(RE_HEX)) {
                   // remove optional leading #
                   if (hex.length === 4 || hex.length === 7) {
                           hex = hex.substr(1);
                   }
                   // expand short-notation to full six-digit
                   if (hex.length === 3) {
                           hex = hex.split('');
                           hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
                   }
                   var u = parseInt(hex, 16);
                   var r = u >> 16;
                   var g = u >> 8 & 0xFF;
                   var b = u & 0xFF;
                   return [r,g,b,1];
           }

           // match rgba hex format, eg #FF000077
           if (hex.match(RE_HEXA)) {
                   if (hex.length === 9) {
                           // remove optional leading #
                           hex = hex.substr(1);
                   }
                   var u$1 = parseInt(hex, 16);
                   var r$1 = u$1 >> 24 & 0xFF;
                   var g$1 = u$1 >> 16 & 0xFF;
                   var b$1 = u$1 >> 8 & 0xFF;
                   var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
                   return [r$1,g$1,b$1,a];
           }

           // we used to check for css colors here
           // if _input.css? and rgb = _inp...