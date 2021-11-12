"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
class Utils {
    static setCliEnv() {
        core.exportVariable("JFROG_CLI_ENV_EXCLUDE", "*password*;*secret*;*key*;*token*;JF_ARTIFACTORY_*");
        core.exportVariable("JFROG_CLI_OFFER_CONFIG", "false");
        let buildNameEnv = core.getInput(Utils.BUILD_NAME);
        if (buildNameEnv) {
            core.exportVariable("JFROG_CLI_BUILD_NAME", buildNameEnv);
        }
        let buildNumberEnv = core.getInput(Utils.BUILD_NUMBER);
        if (buildNumberEnv) {
            core.exportVariable("JFROG_CLI_BUILD_NUMBER", buildNumberEnv);
        }
        let buildProjectEnv = core.getInput(Utils.JFROG_PROJECT);
        if (buildProjectEnv) {
            core.exportVariable("JFROG_CLI_BUILD_PROJECT", buildProjectEnv);
        }
        core.exportVariable("JFROG_CLI_BUILD_URL", process.env.GITHUB_SERVER_URL +
            "/" +
            process.env.GITHUB_REPOSITORY +
            "/actions/runs/" +
            process.env.GITHUB_RUN_ID);
        core.exportVariable("JFROG_CLI_USER_AGENT", Utils.USER_AGENT);
    }
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = 0;
            let args = [];
            if (core.getInput(Utils.BUILD_TYPE) == "helm-deploy") {
                args = ["rt", "build-collect-env"];
                res = yield (0, exec_1.exec)("jfrog", args);
                args = ["rt", "build-add-gi"];
                res = yield (0, exec_1.exec)("jfrog", args);
                args = ["rt", "u", "(*).tgz", core.getInput(Utils.HELM_REPO)];
                res = yield (0, exec_1.exec)("jfrog", args);
                args = ["rt", "build-publish"];
                res = yield (0, exec_1.exec)("jfrog", args);
                args = ["rt", "build-scan", "--fail=" + core.getInput(Utils.BUILD_FAIL_ONSCAN)];
                res = yield (0, exec_1.exec)("jfrog", args);
            }
            if (core.getInput(Utils.BUILD_TYPE) == "promote-helm") {
                args = [
                    "rt",
                    "build-promote",
                    core.getInput(Utils.PROMOTE_BUILD_NAME),
                    core.getInput(Utils.PROMOTE_BUILD_NUMBER),
                    core.getInput(Utils.PROMOTE_TO_REPO),
                    "--project=" + core.getInput(Utils.JFROG_PROJECT),
                    "--source-repo=" + core.getInput(Utils.PROMOTE_SOURCE_REPO),
                    "--copy=true",
                ];
                res = yield (0, exec_1.exec)("jfrog", args);
            }
            if (res !== core.ExitCode.Success) {
                throw new Error("JFrog CLI exited with exit code " + res);
            }
        });
    }
}
exports.Utils = Utils;
Utils.USER_AGENT = "setup-jfrog-cli-github-action/" + require("../package.json").version;
Utils.BUILD_NAME = "build-name";
Utils.BUILD_NUMBER = "build-number";
Utils.BUILD_TYPE = "build-type";
Utils.JFROG_PROJECT = "jfrog-project";
Utils.HELM_REPO = "helm-repo";
Utils.BUILD_FAIL_ONSCAN = "build-fail-onscan";
Utils.PROMOTE_TO_REPO = "promote-to-repo";
Utils.PROMOTE_BUILD_NAME = "promote-build-name";
Utils.PROMOTE_BUILD_NUMBER = "promote-build-number";
Utils.PROMOTE_SOURCE_REPO = "promote-source-repo";
