const Crawler = require("crawler")
const fs = require('fs')
const arg = process.argv

let links = [];
let recipes = [];

let getRecipes = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            console.log(error)
        } else {
            var $ = res.$
            $(".entry-content").each(function(){
                console.log(this)
            })
            // recipes.push({
            //     'nome': $("title").text(),
            //     'receita': $
            // })
        }
        done();
    }
});

let main = new Crawler({
    maxConnections: 10,
    callback: function (err, res, done) {
        if (err) {
            console.log(err)
        } else {
            var $ = res.$
            $('.text-content').each(function () {
                links.push(this.parent.attribs.href);
                getRecipes.queue(this.parent.attribs.href)
            })
        }
        done()
    }
})

main.queue(`https://guiadacozinha.com.br/?s=${arg[2]}`)
