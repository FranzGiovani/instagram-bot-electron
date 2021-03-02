const sizePage = function (page) {

  const sizePage = page.evaluate(() => {
    var sizePage = document.body.scrollHeight
    return sizePage
  })
  return sizePage;
}

module.exports = sizePage;