const https = require("https");

exports.handler = (event, context, callback) => {

    if (event.httpMethod !== "POST") {
        callback(null, {
            statusCode: 400,
            body: ''
        });
        return;
    }

    var options = {
        hostname: "script.google.com",
        path: "/macros/s/AKfycbyFcpwexGADNSbsQLR9JETVgHNYpNiNoG_V3VWA95Ti3hkcPRQ/exec",
        method: "POST"
    };
    https.request(options, response => {
        response.on('end', () => {
            callback(null, {
                statusCode: 200,
                body: ''
            });
        });
    }).on("error", (error) => {
        callback(null, {
            statusCode: 400,
            body: ''
        });
    });
}
