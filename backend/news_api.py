import requests
import json

def get_news_articles():
    url = "https://newsdata.io/api/1/news?apikey=pub_38726bf2031c053736d3d13c43d03cbf5fc0b&q=parenting&country=in"

    response = requests.get(url)
    data = json.loads(response.text)
    
    news_articles = []
    
    for article in data['results']:
        title = article['title'] 
        link = article['link']
        description = article['description']
        
        news_article = {
            "title": title,
            "link": link,
            "description": description
        }
        
        news_articles.append(news_article)
        
    return news_articles

articles = get_news_articles()

print(articles)