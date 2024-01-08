import junit.framework.TestCase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

class User	{

	public static WebDriver driver;

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\oband\\eclipse-workspace\\TestDSW\\src\\test\\java\\Drivers\\chrome-win64\\chromedriver.exe");
		driver = new ChromeDriver();
		successLogin();
		Thread.sleep(2000);
		failAddProfessor();
	}

	public static void failLogin() {
		driver.get("http://localhost:5173/login");
		driver.findElement(By.id("username")).sendKeys("test");
		driver.findElement(By.id("password")).sendKeys("password");
		driver.findElement(By.className("btn-primary")).click();
	}

	public static void successLogin() {
		driver.get("http://localhost:5173/login");
		driver.findElement(By.id("username")).sendKeys("test");
		driver.findElement(By.id("password")).sendKeys("password0");
		driver.findElement(By.className("btn-primary")).click();
	}
	
	public static void failChangePassword() {
		driver.get("http://localhost:5173/edituser");
		WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
		driver.findElement(By.id("password")).sendKeys("tu_contrase�a");
        driver.findElement(By.id("confirmPassword")).sendKeys("tu_contrase�a1");
        WebElement actualizarButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary")));
        actualizarButton.click();
	}

	public static void successChangePassword() {
		driver.get("http://localhost:5173/edituser");
	    WebDriverWait wait = new WebDriverWait(driver, 10);
	    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
	    driver.findElement(By.id("password")).sendKeys("tu_contrase�a1");
	    driver.findElement(By.id("confirmPassword")).sendKeys("tu_contrase�a1");
	    WebElement actualizarButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary")));
	    actualizarButton.click();
	}

	public static void successAddNotification() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary"))).click();
        driver.findElement(By.id("title")).sendKeys("T�tulo de prueba");
        driver.findElement(By.id("checkboxValidation")).click();
        driver.findElement(By.name("type")).sendKeys("Suspensi�n");
        driver.findElement(By.id("date")).sendKeys("2022-01-01");
        driver.findElement(By.id("description")).sendKeys("Esta es una descripci�n de prueba.");
        driver.findElement(By.cssSelector("button.btn-primary")).click();
	}

	public static void failAddNotification() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary"))).click();
        driver.findElement(By.name("type")).sendKeys("Suspensi�n");
        driver.findElement(By.id("date")).sendKeys("2022-01-01");
        driver.findElement(By.id("description")).sendKeys("Esta es una descripci�n de prueba.");
        driver.findElement(By.cssSelector("button.btn-primary")).click();
	}

	public static void successEditNotification() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		WebElement elemento = driver.findElements(By.cssSelector("article.flex.flex-col")).get(0);
		elemento.findElement(By.cssSelector("button.bg-yellow")).click();
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary"))).click();
        driver.findElement(By.id("title")).sendKeys("T�tulo de prueba");
        driver.findElement(By.id("checkboxValidation")).click();
        driver.findElement(By.name("type")).sendKeys("Suspensi�n");
        driver.findElement(By.id("date")).sendKeys("2022-01-01");
        driver.findElement(By.id("description")).sendKeys("Esta es una descripci�n de prueba.");
        driver.findElement(By.cssSelector("button.btn-primary")).click();
	}

	public static void successDeleteNotificaction() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary")));
		WebElement segundoElemento = driver.findElements(By.cssSelector("article.flex.flex-col")).get(1);
		segundoElemento.findElement(By.cssSelector("button.bg-red")).click();
	}

	public static void successAddFormat() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/format");
		wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.btn.btn-primary"))).click();
		driver.findElement(By.id("title")).sendKeys("T�tulo del formato");
        driver.findElement(By.id("fileValidation")).sendKeys("rutapdf");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
    }

	public static void failAddFormat() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/format");
		wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.btn.btn-primary"))).click();
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
    }

	public static void successEditFormat() {
	    WebDriverWait wait = new WebDriverWait(driver, 10);
	    driver.get("http://localhost:5173/format");
	    wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary")));
	    driver.findElement(By.cssSelector(".bg-yellow.btn.btn-primary")).click();
		driver.findElement(By.id("title")).sendKeys("T�tulo del formato");
        driver.findElement(By.id("fileValidation")).sendKeys("rutapdf");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	}

	public static void failEditFormat() {
	    WebDriverWait wait = new WebDriverWait(driver, 10);
	    driver.get("http://localhost:5173/format");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("article:first-child .bg-yellow.btn.btn-primary"))).click();
	    driver.findElement(By.cssSelector(".bg-yellow.btn.btn-primary")).click();
        driver.findElement(By.id("fileValidation")).sendKeys("rutapdf");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	    
	}

	public static void successDeleteFormat() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
	    driver.get("http://localhost:5173/format");
	    wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn-primary")));
		driver.findElement(By.cssSelector(".bg-red.btn.btn-primary")).click();
	}

	public static void successAddProfessor() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/teacher");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn.btn-primary"))).click();
		driver.findElement(By.name("name")).sendKeys("TuNombre");
        driver.findElement(By.name("paternalSurname")).sendKeys("TuApellidoPaterno");
        driver.findElement(By.name("maternalSurname")).sendKeys("TuApellidoMaterno");
        driver.findElement(By.name("emailAddress")).sendKeys("tuCorreo@example.com");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	}

	public static void failAddProfessor() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/teacher");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn.btn-primary"))).click();
		driver.findElement(By.name("name")).sendKeys("TuNombre");
        driver.findElement(By.name("paternalSurname")).sendKeys("TuApellidoPaterno");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	}

	public static void successEditProfessor() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/teacher");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("article:first-child .bg-yellow.btn.btn-primary"))).click();
		driver.findElement(By.name("name")).sendKeys("TuNombre");
        driver.findElement(By.name("paternalSurname")).sendKeys("TuApellidoPaterno");
        driver.findElement(By.name("maternalSurname")).sendKeys("TuApellidoMaterno");
        driver.findElement(By.name("emailAddress")).sendKeys("tuCorreo@example.com");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	}

	public static void failEditProfessor() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/teacher");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("article:first-child .bg-yellow.btn.btn-primary"))).click();
		driver.findElement(By.name("name")).sendKeys("TuNombre");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	}

	public static void successAddStudent() {
		WebDriverWait wait = new WebDriverWait(driver, 10);
		driver.get("http://localhost:5173/student");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn.btn-primary"))).click();
		driver.findElement(By.name("name")).sendKeys("TuNombre");
        driver.findElement(By.name("paternalSurname")).sendKeys("TuApellidoPaterno");
        driver.findElement(By.name("maternalSurname")).sendKeys("TuApellidoMaterno");
        driver.findElement(By.name("emailAddress")).sendKeys("tuCorreo@example.com");
        driver.findElement(By.cssSelector("button.btn.btn-primary")).click();
	}

}