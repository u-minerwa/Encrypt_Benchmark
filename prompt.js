const prompt = require("prompt"), // Prompt - для командной строки в node.js. запрашивает пользователя для ввода, поддерживает проверку и значения по умолчанию, скрывает пароли.
    script = require('./index');

prompt.start()

prompt.get(['path'], function (err, result) {
    script.getBenchmarkTest(result.path)
});

