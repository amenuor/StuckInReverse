var exec = require('child_process').exec;
var staticAnalysis = require('../StaticAnalysis');
var UnixAdapter = (function () {
    function UnixAdapter(pathToProgram) {
        var _this = this;
        this.performStaticAnalysis = function (callback) {
            _this.runShellCommand(function (error, stdout, stderr) {
                var result = new staticAnalysis.StaticAnalysisResults();
                result.stdout = stdout;
                result.stderr = stderr;
                result.error = error;
                callback(result);
            });
        };
        this._pathToProgram = pathToProgram;
    }
    UnixAdapter.prototype.runShellCommand = function (callback) {
        exec("strings " + this._pathToProgram, callback);
    };
    return UnixAdapter;
})();
exports.UnixAdapter = UnixAdapter;
