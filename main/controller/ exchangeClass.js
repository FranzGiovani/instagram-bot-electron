const  exchangeClass = async function (page) {

  const exchangeClass = await page.evaluate(async () => {
    const nodeList = await document.querySelectorAll('article img');
    for (i = 0; i < nodeList.length; i++) {
      nodeList[i].className = i;
    }
  })
}

module.exports = exchangeClass;