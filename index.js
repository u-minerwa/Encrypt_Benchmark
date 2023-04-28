const fs = require("fs"),
    crypto = require("crypto"),
    CryptoJS = require("crypto-js");  // подключаем библиотеку. 

const initVector = crypto.randomBytes(16),
    securityKey = crypto.randomBytes(32).toString();

const encryptMethods = { // методы шифрования
    aes: "AES",
    des: "DES",
    des3: "TripleDES",
    rabbit: "Rabbit",
    rc4: "RC4",
};

const encryptModes = { // Режимы шифрования
    cbc: "CBC",
    cfb: "CFB",
    ctr: "CTR",
    ofb: "OFB",
    ecb: "ECB",
};

const benchmarkResults = []

function encryptBenchmark(message, method, mode, securityKey, initVector) {  // проводим тесты + засекаем время
    const timeStart = Date.now();
    const encrypted = CryptoJS[method].encrypt(JSON.stringify(message), securityKey, { // Создаём переменную зашифровки, конвертируем сообщение в JSON.
        iv: initVector,
        mode: CryptoJS.mode[mode],
        padding: CryptoJS.pad.Pkcs7
    });
    const decrypted = CryptoJS[method].decrypt(encrypted.toString(), securityKey); // Создаём переменную расшифровки. 
    const timeEnd = Date.now();

    benchmarkResults.push({
        output: `${method}, ${mode}: ${timeEnd - timeStart}ms `, // Это будет выведено в консоль
        time: timeEnd - timeStart,
        decrypted
    })

    //GetLiveOutput
    console.clear()
    benchmarkResults.sort((a, b) => a.time - b.time)        // Сортировка
    benchmarkResults.forEach(v => console.log(v.output))
}

function getBenchmarkTest(path) {
    const message = fs.readFileSync(path, "utf8");

//3DES
    encryptBenchmark(message, encryptMethods.des3, encryptModes.cbc, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des3, encryptModes.cfb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des3, encryptModes.ctr, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des3, encryptModes.ecb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des3, encryptModes.ofb, securityKey, initVector);

//DES
    encryptBenchmark(message, encryptMethods.des, encryptModes.cbc, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des, encryptModes.cfb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des, encryptModes.ctr, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des, encryptModes.ecb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.des, encryptModes.ofb, securityKey, initVector);

//RC4
    encryptBenchmark(message, encryptMethods.rc4, encryptModes.cbc, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rc4, encryptModes.cfb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rc4, encryptModes.ctr, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rc4, encryptModes.ecb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rc4, encryptModes.ofb, securityKey, initVector);
//Rabbit
    encryptBenchmark(message, encryptMethods.rabbit, encryptModes.cbc, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rabbit, encryptModes.cfb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rabbit, encryptModes.ctr, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rabbit, encryptModes.ecb, securityKey, initVector);
    encryptBenchmark(message, encryptMethods.rabbit, encryptModes.ofb, securityKey, initVector);
}

module.exports = {
    getBenchmarkTest
}

