const fs = require('fs')
const path = require('path')

const rootFolder = 'C:/Users/grego/Downloads/testing'
const saveFolder = rootFolder
const fileName = 'testing.csv'
const rowAmount = 1000
const compName = 'Comp 1'

async function main() {
    const folders = await fs.promises.readdir(rootFolder, { withFileTypes: true })

    const structure = {}
    const sheet = [['Comp Name', 'File Name']]

    for (let folder of folders) {
        if (!folder.isDirectory()) continue
        sheet[0].push(folder.name)
        structure[folder.name] = await fs.promises.readdir(path.resolve(rootFolder, folder.name))
    }

    let structureCopy = makeCopy(structure, {})

    for (let i = 0; i < rowAmount; i++) {
        const row = [compName, i]
        for (let stuct in structureCopy) {
            structureCopy = makeCopy(structure, structureCopy)
            row.push(structureCopy[stuct].splice(randomNumber(structureCopy[stuct].length), 1)[0])
        }
        sheet.push(row)
    }

    console.log(sheet)

    fs.writeFileSync(path.resolve(saveFolder, fileName), sheet.join('\n'))
}

function makeCopy(structure, structureCopy) {
    for (let stuct in structure) {
        if (structureCopy[stuct] === undefined || structureCopy[stuct].length === 0) {
            structureCopy[stuct] = structure[stuct].slice()
        }
    }

    return structureCopy
}

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

main()