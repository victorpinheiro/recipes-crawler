const Crawler = require("crawler")
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const arg = process.argv

const spinner = ora(`Procurando receitas de ${arg[2]}`)
spinner.start()

let getRecipes = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            console.log(error)
        } else {
            var $ = res.$
            writeFile(`nome: ${$("title").text()} \n receita: ${$(".p402_premium").text()} ---------------------------------------------------------- \n\n`)
        }
        done();
    }
});

let main = new Crawler({
    maxConnections: 10,
    callback: function (err, res, done) {
        console.log(chalk.cyan('\n Receitas encontradas! \n'))
        if (err) {
            console.log(err)
        } else {
            var $ = res.$
            $('.text-content').each(function () {
                getRecipes.queue(this.parent.attribs.href)
            })
        }
        console.log(chalk.green('Receitas salvas!'))
        spinner.stop()
        done()
    }
})

let writeFile = (text) => {
    fs.appendFile(`Receitas de ${arg[2]}`, text, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

main.queue(`https://guiadacozinha.com.br/?s=${arg[2]}`)
