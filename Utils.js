var unixOS = require('./OSAdapters/UnixAdapter');
var Utils = (function () {
    function Utils() {
    }
    Utils.getAdapterImplementation = function (pathToProgram) {
        switch (process.platform) {
            case 'darwin':
                return new unixOS.UnixAdapter(pathToProgram);
                break;
            default:
                throw new Error("Platform " + process.platform + " is not supported yet.");
        }
    };
    return Utils;
})();
exports.Utils = Utils;
