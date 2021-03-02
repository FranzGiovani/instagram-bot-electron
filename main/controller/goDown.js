const goDown = async function (page) {

    await page.evaluate(async () => {

        await new Promise((resolve, reject) => {
            try {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            } catch (error) {
                reject(error);
            }

        }).catch(error => {
            console.error(error);

        })
    })
}

module.exports = goDown;

