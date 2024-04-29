from googlesearch import search
import sys
import json

def scrape_google_results(query):
    try:
        # Using the search method from googlesearch library to get search results
        search_results = search(query, num=10, stop=10, pause=2)
        
        # Loop through the search results and print the titles
        for idx, title in enumerate(search_results, start=1):
            # print(f" {title}")
            # Create a list to store the search results
            results = []

            # Loop through the search results and add them to the list
            for idx, title in enumerate(search_results, start=1):
                results.append(title)

            # Convert the list to JSON format
            json_results = json.dumps(results)

            # Print the JSON results
            print(json_results)
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    query = sys.argv[1]
    scrape_google_results(query+"car"+"parts")
