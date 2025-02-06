import mysql.connector
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
from bs4 import BeautifulSoup

# Set up Selenium WebDriver
chrome_options = Options()
chrome_options.add_argument("--headless")  # Optional: Run Chrome in headless mode (no GUI)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# URL to scrape
url = "https://www.sydney.com/events"  # Update with the actual URL

# Open the events page
driver.get(url)

# Print first 500 characters of the page source for debugging
print(driver.page_source[:500])

# Wait for the event cards container to load
try:
    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.CLASS_NAME, "event-card-container"))  # Adjust this to the correct class name
    )
except TimeoutException:
    print("Timed out waiting for page to load!")
    driver.quit()
    exit()

# Scroll to the bottom of the page to load all events (in case of infinite scroll)
scroll_pause_time = 2  # Wait time to load after scroll
last_height = driver.execute_script("return document.body.scrollHeight")

# Scroll until we reach the bottom of the page (to load all content)
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    sleep(scroll_pause_time)
    new_height = driver.execute_script("return document.body.scrollHeight")
    
    if new_height == last_height:
        break
    last_height = new_height

# Get the page source after all content is loaded
page_source = driver.page_source

# Use BeautifulSoup to parse the page source
soup = BeautifulSoup(page_source, 'html.parser')

# MySQL connection setup
db = mysql.connector.connect(
    host="localhost",
    user="root",  # replace with your MySQL user
    password="root",  # replace with your MySQL password
    database="event_db"  # replace with your database name
)
cursor = db.cursor()

# Function to get event data
def get_event_data():
    events = []

    # Find all event cards (adjust based on actual HTML structure)
    event_cards = soup.find_all('div', class_='event-card-container')  # Adjust this based on actual class

    for event in event_cards:
        title = event.find('h3', class_='event-title').text.strip() if event.find('h3', class_='event-title') else 'No Title'
        date = event.find('span', class_='event-date').text.strip() if event.find('span', class_='event-date') else 'No Date'
        venue = event.find('span', class_='event-venue').text.strip() if event.find('span', class_='event-venue') else 'No Venue'
        price = event.find('span', class_='event-price').text.strip() if event.find('span', class_='event-price') else 'No Price'
        event_url = event.find('a')['href'].strip() if event.find('a') else 'No URL'
        description = event.find('p', class_='event-description').text.strip() if event.find('p', class_='event-description') else 'No Description'
        image_url = event.find('img')['src'].strip() if event.find('img') else 'No Image URL'
        
        # Add extra fields if required, such as location, tickets, or other available data
        location = event.find('span', class_='event-location').text.strip() if event.find('span', class_='event-location') else 'No Location'

        events.append((title, date, venue, price, event_url, description, image_url, location))

    return events

# Function to save events to the database
def save_events_to_db(events):
    for event in events:
        cursor.execute(
            "INSERT INTO events (title, date, venue, price, url, description, image_url, location) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", event
        )
    db.commit()

# Main function to execute the scraping and saving
def main():
    events = get_event_data()
    if events:
        save_events_to_db(events)
        print("Events saved successfully!")
    else:
        print("No events found.")

# Run the scraper
if __name__ == "__main__":
    main()

# Close the browser window after scraping is done
driver.quit()
