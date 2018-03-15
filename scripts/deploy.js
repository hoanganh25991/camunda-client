import cpf from "child_process"
import fse from "fs-extra"
import path from "path"
const _ = console.log
const pPath = `${__dirname}/..`

// Session has storage inside, store token
// _("[INFO] Clean dist")
// _(cpf.execSync(`rm -rf ${pPath}/dist`).toString())

_("[INFO] Cp src")
fse.copySync(path.join(pPath, "src"), path.join(pPath, "dist"))

_("[INFO] Run build")
_(cpf.execSync(`babel ${pPath}/src --out-dir=${pPath}/dist`).toString())
