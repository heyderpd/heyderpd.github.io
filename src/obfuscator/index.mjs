import fs from 'fs'
// import { load, save, injectData, recoveryData } from 'code-image-obfuscator'

const dataDirectory = './src/obfuscator/data'
const imageDirectory = './src/obfuscator/image'
const ignoreFiles = ['.gitignore']
const nameSeparator = ':::'
const fileSeparator = '___'

const loadFiles = _ => {
  const data = fs.readdirSync(dataDirectory)
    .filter(file => ignoreFiles.indexOf(file) == -1)
    .map(file => file + nameSeparator + fs.readFileSync(`${dataDirectory}/${file}`, { encoding: 'base64' }))
    .join(fileSeparator)
  console.log(data.length)
}

const main = _ => {
    loadFiles()
}

main()
