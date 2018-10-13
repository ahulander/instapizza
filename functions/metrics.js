
exports.handler = function(event, context, callback) {

    if (event.httpMethod !== "POST") {
        callback(null, {
            statusCode: 400,
            body: ''
        });
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbyFcpwexGADNSbsQLR9JETVgHNYpNiNoG_V3VWA95Ti3hkcPRQ/exec", {
        method: "POST",
    });

    callback(null, {
        statusCode: 200,
        body: ''
    });
}
