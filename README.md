## Features
Our free Instagram Audience Scraper allows you to scrape followers-following from profiles and comments-likes from posts even if its high amount (thousands or even tens of thousands). We recommend to scrape a max of 100 profiles per day, spread out across 1 launch per hour.

## Get your cookie
Actor needs to connect to Instagram user account. To do this, it needs your session cookie named `sessionid`.
Don't worry! Actor doesn't know your password, nor your email address.

- Open a new tab and go to the Instagram website. Right-click anywhere on the page and open "Inspect".
- Locate the "Application" tab. Then select "Cookies" > "http://www.instagram.com". Locate the cookie `sessionid`
- Copy this and paste it back into the input in your Apify actor.

## Cost of usage
- [Compute units](https://apify.com/pricing/actors) - used for running the scraper, you should be able to get around 7.000 - 10.000 results per hour.

### Using proxies
Datacenter proxies or any other proxies will work.

### Instagram output examples

```jsonc
{
  "type": "comments",
  "instagramUrl": "https://www.instagram.com/p/CeZUuTEjnsa/",
  "profileUrl": "https://www.instagram.com/alexeyudovydchenko",
  "details": {
    "created_at": "6/5/2022, 10:08:41 PM",
    "id": "17901446582613253",
    "text": "😀❤️",
    "username": "alexeyudovydchenko",
    "profile_pic_url": "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/21879069_1932425943664048_6301929264866394112_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=104&_nc_ohc=Zq3K9jJt30QAX8My6KQ&edm=AI-cjbYBAAAA&ccb=7-5&oh=00_AT-XX2ByI2HqACuLMCuIWv3k9FHB3WSF_Qll1_TUOczNcQ&oe=62A4503F&_nc_sid=ba0005",
    "profile_url": "https://www.instagram.com/alexeyudovydchenko"
  }
},
{
  "type": "likes",
  "instagramUrl": "https://www.instagram.com/p/CeZUuTEjnsa/",
  "profileUrl": "https://www.instagram.com/mr.bearightside",
  "details": {
    "id": "53055140",
    "username": "mr.bearightside",
    "full_name": "Arian S.",
    "profile_pic_url": "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/275684815_668141107641786_1076076365529199030_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=106&_nc_ohc=R_OVvgWkmZoAX-Wdkgy&edm=AAo1ks0BAAAA&ccb=7-5&oh=00_AT_RYEOK9Ym_H9VXSa0a-aBv5mQcXhMmfXAdyCHYzEc2XQ&oe=62A52144&_nc_sid=01e9e1",
    "is_verified": "false",
    "followed_by_viewer": "false",
    "requested_by_viewer": "false",
    "profile_url": "https://www.instagram.com/mr.bearightside"
  }
},
{
  "type": "following",
  "instagramUrl": "https://www.instagram.com/apifytech/",
  "profileUrl": "https://www.instagram.com/bbalkansky",
  "details": {
    "pk": 904739536,
    "username": "bbalkansky",
    "full_name": "Bogomil Balkansky",
    "is_private": false,
    "profile_pic_url": "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/55947318_369052530364871_348977547477778432_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=111&_nc_ohc=BUmk2uw5zLkAX_AgHgN&edm=ALB854YBAAAA&ccb=7-5&oh=00_AT9yeb7SBFcxQH6sagb3x5hDb4wgyBAbAg2FkYJ4ficrnA&oe=62A3A6E6&_nc_sid=04cb80",
    "profile_pic_id": "2011769573470074987_904739536",
    "is_verified": false,
    "follow_friction_type": 0,
    "growth_friction_info": {
      "has_active_interventions": false,
      "interventions": {}
    },
    "account_badges": [],
    "has_anonymous_profile_picture": false,
    "has_highlight_reels": false,
    "latest_reel_media": 0,
    "is_favorite": false,
    "profile_url": "https://www.instagram.com/bbalkansky"
  }
},
{
  "type": "followers",
  "instagramUrl": "https://www.instagram.com/apifytech/",
  "profileUrl": "https://www.instagram.com/petr.patek52",
  "details": {
    "pk": 16108745209,
    "username": "petr.patek52",
    "full_name": "Petr Patek",
    "is_private": true,
    "profile_pic_url": "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/67492906_444738979462564_2508426493328097280_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=104&_nc_ohc=Br7llsoAkYYAX_U3mcX&tn=zIBiUYTwTtFHzdaf&edm=APQMUHMBAAAA&ccb=7-5&oh=00_AT8lrXWx80uACH4Xn1sRSOnSuK3C6kwO67LjukuMWtU9Tg&oe=62A496CE&_nc_sid=e5d0a6",
    "profile_pic_id": "2081914644909315154_16108745209",
    "is_verified": false,
    "follow_friction_type": 0,
    "growth_friction_info": {
      "has_active_interventions": false,
      "interventions": {}
    },
    "account_badges": [],
    "has_anonymous_profile_picture": false,
    "has_highlight_reels": false,
    "latest_reel_media": 0,
    "profile_url": "https://www.instagram.com/petr.patek52"
  }
}
```