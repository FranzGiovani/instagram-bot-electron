const takesArraySize= async function (page) {

    const takesArraySize = await page.evaluate(async () => {
        const nodeList = await document.querySelectorAll('article img');
        for (i = 0; i < nodeList.length; i++) {
            nodeList[i].className = i;
        }
        let takesArraySize = nodeList.length;
        return takesArraySize
    })
    return takesArraySize
}

module.exports = takesArraySize;