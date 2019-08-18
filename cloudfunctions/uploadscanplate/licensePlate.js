"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baidu_aip_sdk_1 = require("baidu-aip-sdk");
var fs = require("fs");
var app_id = "16802498";
var api_key = "Gy3snWWGXxAYn7AToT1GkkUt";
var secret_key = "idG3M6LjlgYG3822lCfehh7Gxv6DmlQc";
var aipClient = new baidu_aip_sdk_1.ocr(app_id, api_key, secret_key);
function scanPlate(imageData, multiple) {
    if (multiple === void 0) { multiple = false; }
    return aipClient.licensePlate(imageData, multiple.toString());
}
exports.scanPlate = scanPlate;
function scanPlateFromFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                return reject(err);
            }
            aipClient.licensePlate(data.toString('base64'))
                .then(function (ret) {
                resolve(ret);
            })
                .catch(function (ex) {
                reject(ex);
            });
        });
    });
}
exports.scanPlateFromFile = scanPlateFromFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljZW5zZVBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGljZW5zZVBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQWdEO0FBQ2hELHVCQUF5QjtBQUV6QixJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDMUIsSUFBTSxPQUFPLEdBQUcsMEJBQTBCLENBQUM7QUFDM0MsSUFBTSxVQUFVLEdBQUcsa0NBQWtDLENBQUM7QUFXdEQsSUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFjdkQsU0FBZ0IsU0FBUyxDQUFDLFNBQWlCLEVBQUUsUUFBeUI7SUFBekIseUJBQUEsRUFBQSxnQkFBeUI7SUFDbEUsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRkQsOEJBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxJQUFJO0lBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUMvQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ3hCLElBQUksR0FBRyxFQUFFO2dCQUNMLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMxQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsRUFBRTtnQkFDTCxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBZkQsOENBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvY3IsIEh0dHBDbGllbnQgfSBmcm9tIFwiYmFpZHUtYWlwLXNka1wiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbmNvbnN0IGFwcF9pZCA9IFwiMTY4MDI0OThcIjtcclxuY29uc3QgYXBpX2tleSA9IFwiR3kzc25XV0dYeEFZbjdBVG9UMUdra1V0XCI7XHJcbmNvbnN0IHNlY3JldF9rZXkgPSBcImlkRzNNNkxqbGdZRzM4MjJsQ2ZlaGg3R3h2NkRtbFFjXCI7XHJcblxyXG5cclxuXHJcbi8vIEh0dHBDbGllbnQuc2V0UmVxdWVzdE9wdGlvbnMoeyB0aW1lb3V0OiA1MDAwIH0pO1xyXG4vLyBIdHRwQ2xpZW50LnNldFJlcXVlc3RJbnRlcmNlcHRvcigocmVxdWVzdE9wdGlvbnMpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKHJlcXVlc3RPcHRpb25zKTtcclxuLy8gICAgIHJlcXVlc3RPcHRpb25zLnRpbWVvdXQgPSA1MDAwO1xyXG4vLyAgICAgcmV0dXJuIHJlcXVlc3RPcHRpb25zO1xyXG4vLyB9KTtcclxuXHJcbmNvbnN0IGFpcENsaWVudCA9IG5ldyBvY3IoYXBwX2lkLCBhcGlfa2V5LCBzZWNyZXRfa2V5KTtcclxuXHJcbmludGVyZmFjZSBMaWNlbnNlUGxhdGVSZXN1bHQge1xyXG4gICAgbG9nX2lkOiBudW1iZXI7XHJcbiAgICBlcnJvcl9jb2RlPzogbnVtYmVyO1xyXG4gICAgZXJyb3JfbXNnPzogc3RyaW5nO1xyXG4gICAgd29yZHNfcmVzdWx0Pzoge1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgbnVtYmVyOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvYmFiaWxpdHk6IG51bWJlcltdLFxyXG4gICAgICAgIHZlcnRleGVzX2xvY2F0aW9uOiBhbnlbXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjYW5QbGF0ZShpbWFnZURhdGE6IHN0cmluZywgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8TGljZW5zZVBsYXRlUmVzdWx0PiB7XHJcbiAgICByZXR1cm4gYWlwQ2xpZW50LmxpY2Vuc2VQbGF0ZShpbWFnZURhdGEsbXVsdGlwbGUudG9TdHJpbmcoKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2FuUGxhdGVGcm9tRmlsZShwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZzLnJlYWRGaWxlKHBhdGgsIChlcnIsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFpcENsaWVudC5saWNlbnNlUGxhdGUoZGF0YS50b1N0cmluZygnYmFzZTY0JykpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmV0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChleCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn0iXX0=