'use strict';

const ScoreboardTemplate = {
	pugEscape:

		function pugEscape(e) {
			var a = "" + e, t = this.pugMatchHtml.exec(a);
			if (!t) return e;
			var r, c, n, s = "";
			for (r = t.index, c = 0; r < a.length; r++) {
				switch (a.charCodeAt(r)) {
					case 34:
						n = "&quot;";
						break;
					case 38:
						n = "&amp;";
						break;
					case 60:
						n = "&lt;";
						break;
					case 62:
						n = "&gt;";
						break;
					default:
						continue
				}
				c !== r && (s += a.substring(c, r)), c = r + 1, s += n
			}
			return c !== r ? s + a.substring(c, r) : s
		},

	pugMatchHtml: /["&<>]/,

	template: function template(locals) {
		var pug_html = "", pug_mixins = {}, pug_interp;
		;var locals_for_with = (locals || {});
		(function (users) {
			pug_html = pug_html + "\u003Cthead\u003E\u003Ctr\u003E\u003Cth\u003EEmail\u003C\u002Fth\u003E\u003Cth\u003EScores\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E";
// iterate users
			;(function () {
				var $$obj = users;
				if ('number' == typeof $$obj.length) {
					for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Ctr\u003E\u003Cth\u003E" + (this.pugEscape(null == (pug_interp = user.name) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth\u003E" + (this.pugEscape(null == (pug_interp = user.score) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
					}
				} else {
					var $$l = 0;
					for (var pug_index0 in $$obj) {
						$$l++;
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Ctr\u003E\u003Cth\u003E" + (this.pugEscape(null == (pug_interp = user.name) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003Cth\u003E" + (this.pugEscape(null == (pug_interp = user.score) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
					}
				}
			}).call(this);

			pug_html = pug_html + "\u003C\u002Ftbody\u003E";
		}.call(this, "users" in locals_for_with ? locals_for_with.users : typeof users !== "undefined" ? users : undefined));
		;
		return pug_html;
	}
};

export default ScoreboardTemplate;

