// (function () {
// 	'use strict';
//
// 	window.ScoreboardTemplateOld = {
// 		pugEscape: function pug_escape(e) {
// 			var a = "" + e, t = this.pugMatchHtml.exec(a);
// 			if (!t) return e;
// 			var r, c, n, s = "";
// 			for (r = t.index, c = 0; r < a.length; r++) {
// 				switch (a.charCodeAt(r)) {
// 					case 34:
// 						n = "&quot;";
// 						break;
// 					case 38:
// 						n = "&amp;";
// 						break;
// 					case 60:
// 						n = "&lt;";
// 						break;
// 					case 62:
// 						n = "&gt;";
// 						break;
// 					default:
// 						continue
// 				}
// 				c !== r && (s += a.substring(c, r)), c = r + 1, s += n
// 			}
// 			return c !== r ? s + a.substring(c, r) : s
// 		},
// 		pug_match_html: /["&<>]/,
// 		template: function template(locals) {
// 			var pug_html = "", pug_mixins = {}, pug_interp;
// 			;var locals_for_with = (locals || {});
// 			(function (name) {
// 				pug_html = pug_html + "\u003Cdiv\u003E\u003Cp\u003E" + (this.pugEscape(null == (pug_interp = name) ? "" : pug_interp)) + "'s Pug source code!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
// 			}.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined));
// 			;
// 			return pug_html;
// 		}
// 	}
//
// })();
//
//
