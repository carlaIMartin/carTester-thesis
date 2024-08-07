from googlesearch import search
import sys
import json

def scrape_google_results(query):
    try:
        search_results = search(query, num=10, stop=10, pause=2)
        
        for idx, title in enumerate(search_results, start=1):
            # print(f" {title}")
            
            results = []
            for idx, title in enumerate(search_results, start=1):
                results.append(title)

            json_results = json.dumps(results)

            print(json_results)
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    query = sys.argv[1] + " " + sys.argv[2]
    
    scrape_google_results(query+ " " + "car"+ " " + "parts")
