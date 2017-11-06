'use strict';


/**
 * Скомпилированный шаблон таблицы либеров
 * @module scoreboardTemplate
 */
export default class scoreboardTemplate {
	/**
	 * @constructor
	 */
	constructor() {
		this.pug_match_html = /["&<>]/;
	}

	pug_escape(e) {
		let a = '' + e,
			t = this.pug_match_html.exec(a);
		if (!t) return e;
		let r,
			c,
			n,
			s = '';
		for (r = t.index, c = 0; r < a.length; r++) {
			switch (a.charCodeAt(r)) {
			case 34:
				n = '&quot;';
				break;
			case 38:
				n = '&amp;';
				break;
			case 60:
				n = '&lt;';
				break;
			case 62:
				n = '&gt;';
				break;
			default:
				continue;
			}
			c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
		}
		return c !== r ? s + a.substring(c, r) : s;
	}


	template(locals) {
		let pug_html = '',
			pug_mixins = {},
			pug_interp;
		const locals_for_with = (locals || {});
		(function (users) {
			pug_html += '\u003Cdiv class="scoreboard__fields"\u003E';
			// iterate users
			(function () {
				const $$obj = users;
				if (typeof $$obj.length === 'number') {
					for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
						var user = $$obj[pug_index0];
						pug_html = pug_html + '\u003Cdiv\u003E\u003Cspan\u003E' + (this.pug_escape((pug_interp = user.name) == null ? '' : pug_interp)) + '\u003C\u002Fspan\u003E\u003Cspan\u003E' + (this.pug_escape((pug_interp = user.score) == null ? '' : pug_interp)) + '\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E';
					}
				} else {
					var $$l = 0;
					for (var pug_index0 in $$obj) {
						$$l++;
						var user = $$obj[pug_index0];
						pug_html = pug_html + '\u003Cdiv\u003E\u003Cspan\u003E' + (this.pug_escape((pug_interp = user.name) == null ? '' : pug_interp)) + '\u003C\u002Fspan\u003E\u003Cspan\u003E' + (this.pug_escape((pug_interp = user.score) == null ? '' : pug_interp)) + '\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E';
					}
				}
			}).call(this);

			pug_html += '\u003C\u002Fdiv\u003E';
		}.call(this, 'users' in locals_for_with ? locals_for_with.users : typeof users !== 'undefined' ? users : undefined));

		return pug_html;
	}
}
