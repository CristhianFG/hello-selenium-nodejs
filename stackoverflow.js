#!/usr/bin/env node
const {Builder, By, Key, until} = require('selenium-webdriver');
(async function hello() {
	let driver = await new Builder()
             .forBrowser('firefox').build();
	//Abrir StackOverflow
	await driver.get('https://stackoverflow.com/');

	//Buscar en StackOverflow
	await driver.findElement(
		By.className('-item searchbar-trigger')).click();
	await driver.findElement(
		By.name('q')).sendKeys('[selenium]',Key.RETURN)

	//Mostrar resultados
	let qs = await driver.wait(until.elementsLocated(
		By.className('question-summary')));
	for (let q of qs) {
		//Seleccionar lo que se desea mostrar
		let titleElem = await q.findElement(
			By.className("question-hyperlink"));
		let descElem = await q.findElement(
			By.className("excerpt"));
		let userElem = await q.findElement(
			By.className("user-details"));
		//Recoger los valores seleccionados
		let title = await titleElem.getText();
		let link = await titleElem.getAttribute("href");
		let desc = await descElem.getText();
		let user = await userElem.getText();
		//Mostrar los valores almacenados
		console.log(title + " --> " + user + " --> " + link + "\n");
	}
})();
