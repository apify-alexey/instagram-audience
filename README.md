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

For any IG reaction (like, comment, follows) there is values `type, instagramUrl, profileUrl, profilePic`
The rest of details are differ based on reaction type, if you want to keep output CSV friendly please consider to do separate runs for each reaction type (i.e. one run to get likes, another to get comments and another to check follows - again, only suggested if you want to simplify CSV output, otherwise you will get mixed items).

```jsonc
{
  "type": "following",
  "instagramUrl": "https://www.instagram.com/apifytech/",
  "profileUrl": "https://www.instagram.com/bbalkansky",
  "profilePic": "https://scontent-den4-1.cdninstagram.com/v/t51.2885-19/55947318_369052530364871_348977547477778432_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-den4-1.cdninstagram.com&_nc_cat=111&_nc_ohc=BUmk2uw5zLkAX8aV26L&edm=ALB854YBAAAA&ccb=7-5&oh=00_AT_C08yGf6WTpnfSDVdMaHSzjDlS0GM6KdwuRU0lsoHQRQ&oe=62A5A126&_nc_sid=04cb80",
  "pk": 904739536,
  "username": "bbalkansky",
  "full_name": "Bogomil Balkansky",
  "is_private": false,
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
  "is_favorite": false
},
{
  "type": "followers",
  "instagramUrl": "https://www.instagram.com/apifytech/",
  "profileUrl": "https://www.instagram.com/alexeyudovydchenko",
  "profilePic": "https://scontent-den4-1.cdninstagram.com/v/t51.2885-19/21879069_1932425943664048_6301929264866394112_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-den4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Zq3K9jJt30QAX_TbIuR&edm=APQMUHMBAAAA&ccb=7-5&oh=00_AT_rMjTYOQIJLUPmGpgLZf7fYX0G8kqZiURYACHGo2Bl2Q&oe=62A64A7F&_nc_sid=e5d0a6",
  "pk": 6083345372,
  "username": "alexeyudovydchenko",
  "full_name": "Alexey Udovydchenko",
  "is_private": false,
  "profile_pic_id": "1609845100345983280_6083345372",
  "is_verified": false,
  "follow_friction_type": 0,
  "growth_friction_info": {
    "has_active_interventions": false,
    "interventions": {}
  },
  "account_badges": [],
  "has_anonymous_profile_picture": false,
  "reel_auto_archive": "unset",
  "allowed_commenter_type": "any",
  "has_highlight_reels": false,
  "interop_messaging_user_fbid": 115831779801868,
  "fbid_v2": "17841406041170418",
  "latest_reel_media": 0
},
{
  "type": "likes",
  "instagramUrl": "https://www.instagram.com/p/CeZUuTEjnsa/",
  "profileUrl": "https://www.instagram.com/zuzkave",
  "profilePic": "https://scontent-den4-1.cdninstagram.com/v/t51.2885-19/51177160_310922602895888_2565253020937879552_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-den4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=cdsfa0nL8CIAX-yNywB&edm=AAo1ks0BAAAA&ccb=7-5&oh=00_AT-2AngECifNsBWZlzksnf8LaSF-u5-j7pBu90CbUy045g&oe=62A54EF9&_nc_sid=01e9e1",
  "id": "5598851678",
  "username": "zuzkave",
  "full_name": "Zuzka Velenská",
  "is_verified": "false",
  "followed_by_viewer": "false",
  "requested_by_viewer": "false"
},
{
  "type": "comments",
  "instagramUrl": "https://www.instagram.com/p/CeZUuTEjnsa/",
  "profileUrl": "https://www.instagram.com/alexeyudovydchenko",
  "profilePic": "https://scontent-den4-1.cdninstagram.com/v/t51.2885-19/21879069_1932425943664048_6301929264866394112_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-den4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Zq3K9jJt30QAX_TbIuR&edm=AI-cjbYBAAAA&ccb=7-5&oh=00_AT9XE7CiIDr4Fo3DwKeZt6cvFlP2gZvSgDoTjFHh9cUf7Q&oe=62A64A7F&_nc_sid=ba0005",
  "created_at": "6/5/2022, 10:08:41 PM",
  "id": "17901446582613253",
  "text": "😀❤️",
  "username": "alexeyudovydchenko"
}
```