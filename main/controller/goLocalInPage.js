const goLocalInPage = async function (page, initial, final) {

  await page.evaluate((initial,final) => {

    window.scrollTo(initial,final);

  }, initial,final);

}

module.exports = goLocalInPage;



