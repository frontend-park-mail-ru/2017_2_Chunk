'use strict';

/**
 * Указывает веб паку пути поиска файлов для сборки
 * @param r
 */
function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('./', true, /\.(js)$/));
requireAll(require.context('./', true, /\.(css)$/));
