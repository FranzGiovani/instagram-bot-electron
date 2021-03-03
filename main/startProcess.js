const { ipcMain } = require('electron')
const pie = require('puppeteer-in-electron')

const exchangeClass = require('./controller/ exchangeClass')
const Calculation = require('./controller/calculation')
const goDown = require('./controller/goDown')
const goLocalInPage = require('./controller/goLocalInPage')
const sizePage = require('./controller/sizePage')
const takesArraySize = require('./controller/takesArraySize')

const startProcess = async function (browser, window, url) {

    await new Promise((resolve, reject) => {
        try {
            ipcMain.on('asynchronous-message', (event, args) => {

                if (args == true) {
                    
                    async function start(browser, window, url) {
                        const page = await pie.getPage(browser, window);

                        await goDown(page); //Vai até o fim da pagina

                        let size = await sizePage(page); //pega o tamanho da pagina e armazena
                        await console.log("o tamanho da pagina = " + size);

                        let numberPhotos = await takesArraySize(page); //pega o tamanho do array de fotos
                        await console.log("o numero de fotos = " + numberPhotos);
                        await event.sender.send('asynchronous-message', 'são ' + numberPhotos + " fotos")
                        let calculation = await Calculation(size); //calcula informações reverentes ao tamanho da pagina 
                        await console.log(calculation);
                        await page.goto(url);

                        let initial = 200
                        let final = 1000
                        let base = calculation.roundTotal - initial;

                        await event.sender.send('asynchronous-message', 'start')
                        await exchangeClass(page);

                        for (i = 0; i < numberPhotos; i++) {
                            await goLocalInPage(page, initial, final)
                            var stringClass = ('[class="' + i + '"]');
                            await page.click(stringClass);


                                //adicionar processo de curtir

                            await page.goBack()
                            await exchangeClass(page);
                            if (i > 6) {
                                initial = initial + base
                                final = final + base
                                await goDown(page);
                            }
                            
                            await exchangeClass(page);
                        }
                        await page.goto(url);

                        console.log("final");

                        await event.sender.send('asynchronous-message', 'terminado o processo')

                    }start(browser, window, url);
        }
            })
} catch (error) {
    reject(error);
}
    }).catch (error => {
    console.error(error);
})
}



module.exports = startProcess;