package com.oti.selenium.oti;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class HuntTest {
    WebDriver driver;
    @Before
    public void createDriver() {
    	driver = new FirefoxDriver();
    	driver.get("http://localhost/tw-javascript/index.html");
    }

    @After
    public void freeDriver() {
    	driver.quit();
    }
    
    /* Test : le bouton de création est bien là */
    @Test
    public void testCreationButton() {
        
        List<WebElement> elementList = driver.findElements(By.id("creationbutton"));
        
        /* On vérifie qu'il y en a bien un seul */
        assertTrue(elementList.size() == 1);
    }
    
    /* Test : clic sur le bouton de création renvoie un prompt pour choisir le nom 
     * On est ensuite rediriger vers la premiere question
     * */
    @Test
    public void clickCreationButton() {
    
        /* On récupère cet unique element et on click dessu */
        WebElement element = driver.findElement(By.id("creationbutton"));
        element.click();
        
        /* ON met un nom pour la chasse au trésor */
        Alert prompt = driver.switchTo().alert();
        prompt.sendKeys("New hunt");
        prompt.accept();
        
        /* On test qu'on a bien tous les champs : question/answer/next/finish */
        WebElement question = driver.findElement(By.id("question"));
        WebElement answer = driver.findElement(By.id("answer"));
        
        WebElement next = driver.findElement(By.id("next"));
        WebElement finish = driver.findElement(By.id("finish"));
	}

    /* Tests sur les questions/réponses */
    @Test
	public void questionAnswerTest() {
	
        WebElement element = driver.findElement(By.id("creationbutton"));
        element.click();
        
        /* ON met un nom pour la chasse au trésor */
        Alert prompt = driver.switchTo().alert();
        prompt.sendKeys("New hunt");
        prompt.accept();
        
        /* On test qu'on a bien tous les champs : question/answer/next/finish */
        WebElement question = driver.findElement(By.id("question"));
        WebElement answer = driver.findElement(By.id("answer"));
        
        WebElement next = driver.findElement(By.id("next"));
        
        /* Test click sur next alors qu'il n'y a pas de question renvoie une alerte */
        next.click();
        Alert alert = driver.switchTo().alert();
        alert.accept();
        
        /* On ajoute une question et réponse fausse (pas un nombre) */
        question = driver.findElement(By.id("question"));
        answer = driver.findElement(By.id("answer"));
        next = driver.findElement(By.id("next"));
        question.sendKeys("Quel est l'âge de votre mère?");
        answer.sendKeys("Not a number");
        next.click();
        alert = driver.switchTo().alert();
        alert.accept();
        
        /* Question et réponse ok : on passe a la question 2 */
        question = driver.findElement(By.id("question"));
        answer = driver.findElement(By.id("answer"));
        next = driver.findElement(By.id("next"));
        question.sendKeys("Quel est l'âge de votre mère?");
        answer.sendKeys("47");
        next.click();
        
        question = driver.findElement(By.id("question"));
        answer = driver.findElement(By.id("answer"));
        
        /* On vérifie bien que les questions/réponses sont maintenant vides */
        assertTrue (question.getAttribute("value").equals(""));
        assertTrue (answer.getAttribute("value").equals(""));
    }
    
    /* Test quand on fini la création d'une chasse */
    @Test
    public void finishCreation() {
        WebElement element = driver.findElement(By.id("creationbutton"));
        element.click();
        
        /* ON met un nom pour la chasse au trésor */
        Alert prompt = driver.switchTo().alert();
        prompt.sendKeys("New hunt");
        prompt.accept();
        
        /* On test qu'on a bien tous les champs : question/answer/next/finish */
        WebElement question = driver.findElement(By.id("question"));
        WebElement answer = driver.findElement(By.id("answer"));
        
        WebElement next = driver.findElement(By.id("next"));
        
        /* On ajoute une question */
        question.sendKeys("Quel est l'âge de votre mère?");
        answer.sendKeys("47");
        next.click();
        
        /* Une 2eme ... */
        question = driver.findElement(By.id("question"));
        answer = driver.findElement(By.id("answer"));
        next = driver.findElement(By.id("next"));
        question.sendKeys("Quel est l'âge de votre père?");
        answer.sendKeys("51");
        next.click();
        
        /* On fini ... */
        WebElement finish = driver.findElement(By.id("finish"));
        finish.click();
        
        /* On vérifie qu'on est bien sur la page d'accueil en récupérant le bouton de création */
        WebElement creationButton = driver.findElement(By.id("creationbutton"));
        
        /* ON vérifie que la nouvelle chasse est bien là */
        WebElement hunt = driver.findElement(By.id("New hunt"));

    }
    
    /* Test sur la jouabilité */
    @Test
    public void testJouabilite() {
    	/* on recré la chasse ... le localstorage ne fonctionne pas avec firefoxdriver */
        WebElement element = driver.findElement(By.id("creationbutton"));
        element.click();
        
        /* ON met un nom pour la chasse au trésor */
        Alert prompt = driver.switchTo().alert();
        prompt.sendKeys("New hunt");
        prompt.accept();
        
        /* On test qu'on a bien tous les champs : question/answer/next/finish */
        WebElement question = driver.findElement(By.id("question"));
        WebElement answer = driver.findElement(By.id("answer"));
        
        WebElement next = driver.findElement(By.id("next"));
        
        /* On ajoute une question */
        question.sendKeys("Quel est l'âge de votre mère?");
        answer.sendKeys("47");
        next.click();
        
        /* Une 2eme ... */
        question = driver.findElement(By.id("question"));
        answer = driver.findElement(By.id("answer"));
        next = driver.findElement(By.id("next"));
        question.sendKeys("Quel est l'âge de votre père?");
        answer.sendKeys("51");
        next.click();
        
        /* On fini ... */
        WebElement finish = driver.findElement(By.id("finish"));
        finish.click();
        
        WebElement hunt = driver.findElement(By.id("New hunt"));
        hunt.click();
        
        /* On vérifie qu'on est bien sur la premiere question */
        WebElement questionLabel = driver.findElement(By.tagName("span"));
        
        assertTrue(questionLabel.getText().equals("Quel est l'âge de votre mère?"));
        
        /* dans le cas d'une fausse réponse : une alerte */
        answer = driver.findElement(By.id("answer"));
        answer.sendKeys("37");
        
        WebElement validate = driver.findElement(By.id("validate"));
        validate.click();
        
        Alert alert = driver.switchTo().alert();
        assertTrue(alert.getText().equals("! :-( BAD ANSWER :-( !"));
        alert.accept();
        
        /* Une bonne réponse mène a la question suivante */
        answer = driver.findElement(By.id("answer"));
        answer.sendKeys("47");
        validate = driver.findElement(By.id("validate"));
        validate.click();
        questionLabel = driver.findElement(By.tagName("span"));
        assertTrue(questionLabel.getText().equals("Quel est l'âge de votre père?"));
        
        /* Une bonne réponse à la seconde question termine la chasse */
        answer = driver.findElement(By.id("answer"));
        answer.sendKeys("51");
        validate = driver.findElement(By.id("validate"));
        validate.click();
        /* Une alrte s'affiche ... */
        alert = driver.switchTo().alert();
        assertTrue(alert.getText().equals("! YOU'VE COMPLETED THE HUNT !"));
        alert.accept();
        /* ON vérifie donc qu'on arrive sur l'accueil */
        element = driver.findElement(By.id("creationbutton"));
        
    }
    
    /* On test le bouton 'I Give up' */
    @Test
    public void testGiveUp() {
    	/* on recré la chasse ... le localstorage ne fonctionne pas avec firefoxdriver */
        WebElement element = driver.findElement(By.id("creationbutton"));
        element.click();
        
        /* ON met un nom pour la chasse au trésor */
        Alert prompt = driver.switchTo().alert();
        prompt.sendKeys("New hunt");
        prompt.accept();
        
        /* On test qu'on a bien tous les champs : question/answer/next/finish */
        WebElement question = driver.findElement(By.id("question"));
        WebElement answer = driver.findElement(By.id("answer"));
        
        WebElement next = driver.findElement(By.id("next"));
        
        /* On ajoute une question */
        question.sendKeys("Quel est l'âge de votre mère?");
        answer.sendKeys("47");
        next.click();
        
        /* Une 2eme ... */
        question = driver.findElement(By.id("question"));
        answer = driver.findElement(By.id("answer"));
        next = driver.findElement(By.id("next"));
        question.sendKeys("Quel est l'âge de votre père?");
        answer.sendKeys("51");
        next.click();
        
        /* On fini ... */
        WebElement finish = driver.findElement(By.id("finish"));
        finish.click();
        
        WebElement hunt = driver.findElement(By.id("New hunt"));
        hunt.click();
        
        WebElement giveup = driver.findElement(By.id("giveup"));
        giveup.click();
        
        /* Une alerte s'affiche */
        Alert alert = driver.switchTo().alert();
        assertTrue(alert.getText().equals("You've given up. Maybe next time"));
        alert.accept();
        
        /* ON vérifie donc qu'on arrive sur l'accueil */
        element = driver.findElement(By.id("creationbutton"));
        
    }
    
}